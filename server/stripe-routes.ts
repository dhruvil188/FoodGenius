import { Request, Response } from 'express';
import Stripe from 'stripe';
import { firestoreStorage } from './firestore-storage';

// Initialize Stripe with the secret key
if (!process.env.STRIPE_SECRET_KEY) {
  console.error('Missing required Stripe secret: STRIPE_SECRET_KEY');
}
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2022-11-15' as any,
});

// Subscription plan configurations
const SUBSCRIPTION_PLANS = {
  basic: {
    name: 'Basic',
    price: 800, // $8.00 in cents
    maxAnalyses: 50,
  },
  premium: {
    name: 'Premium',
    price: 1200, // $12.00 in cents
    maxAnalyses: 100,
  },
  unlimited: {
    name: 'Unlimited',
    price: 2500, // $25.00 in cents
    maxAnalyses: 999999, // effectively unlimited
  },
};

// Create a payment intent for a one-time payment
export const createPaymentIntent = async (req: Request, res: Response) => {
  try {
    const { amount } = req.body;
    
    // Check if user is authenticated
    if (!req.session || !req.session.userId) {
      return res.status(401).json({ error: 'You must be logged in to make a payment' });
    }
    
    const userId = req.session.userId;
    const user = await firestoreStorage.getUser(userId);
    
    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }
    
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents
      currency: 'usd',
      metadata: {
        userId: user.id.toString(),
      },
    });
    
    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error: any) {
    res.status(500).json({ error: `Error creating payment intent: ${error.message}` });
  }
};

// Get or create a subscription for the user
export const getOrCreateSubscription = async (req: Request, res: Response) => {
  try {
    // Check if user is authenticated
    if (!req.session || !req.session.userId) {
      return res.status(401).json({ error: 'You must be logged in to subscribe' });
    }
    
    const userId = req.session.userId;
    const user = await firestoreStorage.getUser(userId);
    const { planId = 'basic' } = req.body;
    
    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }
    
    // If user already has a subscription, retrieve it
    if (user.stripeSubscriptionId) {
      const subscription = await stripe.subscriptions.retrieve(user.stripeSubscriptionId);
      
      return res.json({
        subscriptionId: subscription.id,
        clientSecret: typeof subscription.latest_invoice === 'object' && subscription.latest_invoice?.payment_intent 
          ? (subscription.latest_invoice.payment_intent as any).client_secret 
          : null,
      });
    }
    
    // Make sure user has an email
    if (!user.email) {
      return res.status(400).json({ error: 'No user email on file' });
    }
    
    // If no subscription, create a new Stripe customer
    let stripeCustomerId = user.stripeCustomerId;
    
    if (!stripeCustomerId) {
      const customer = await stripe.customers.create({
        email: user.email,
        name: user.username,
        metadata: {
          userId: user.id.toString(),
        },
      });
      
      stripeCustomerId = customer.id;
      await firestoreStorage.updateStripeCustomerId(user.id, customer.id);
    }
    
    // Determine the price based on selected plan
    const selectedPlan = SUBSCRIPTION_PLANS[planId as keyof typeof SUBSCRIPTION_PLANS] || SUBSCRIPTION_PLANS.basic;
    
    // Create a new subscription product and price if it doesn't exist
    let priceId;
    
    // Check if price already exists for this plan
    const prices = await stripe.prices.list({
      lookup_keys: [planId],
      expand: ['data.product'],
    });
    
    if (prices.data.length > 0) {
      priceId = prices.data[0].id;
    } else {
      // Create a new product for this plan
      const product = await stripe.products.create({
        name: `Recipe Snap ${selectedPlan.name} Plan`,
        description: `${selectedPlan.maxAnalyses} recipe analyses per month`,
      });
      
      // Create a price for the product
      const price = await stripe.prices.create({
        product: product.id,
        unit_amount: selectedPlan.price,
        currency: 'usd',
        recurring: {
          interval: 'month',
        },
        lookup_key: planId,
      });
      
      priceId = price.id;
    }
    
    // Create the subscription
    const subscription = await stripe.subscriptions.create({
      customer: stripeCustomerId,
      items: [{ price: priceId }],
      payment_behavior: 'default_incomplete',
      expand: ['latest_invoice.payment_intent'],
      metadata: {
        userId: user.id.toString(),
        planId: planId,
        maxAnalyses: selectedPlan.maxAnalyses.toString(),
      },
    });
    
    // Update user with subscription info
    await firestoreStorage.updateUserSubscription(
      user.id,
      subscription.id,
      planId,
      selectedPlan.maxAnalyses
    );
    
    res.json({
      subscriptionId: subscription.id,
      clientSecret: typeof subscription.latest_invoice === 'object' && subscription.latest_invoice?.payment_intent 
        ? (subscription.latest_invoice.payment_intent as any).client_secret 
        : null,
    });
  } catch (error: any) {
    console.error('Subscription error:', error);
    res.status(500).json({ error: `Error creating subscription: ${error.message}` });
  }
};

// Handle Stripe webhook events (payment confirmation, subscription status changes, etc.)
export const handleStripeWebhook = async (req: Request, res: Response) => {
  const sig = req.headers['stripe-signature'] as string;
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
  
  let event;
  
  try {
    // Verify the event came from Stripe
    if (!endpointSecret) {
      return res.status(400).json({ error: 'Webhook secret not configured' });
    }
    
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      endpointSecret
    );
  } catch (err: any) {
    console.error(`Webhook signature verification failed: ${err.message}`);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }
  
  // Handle the event
  switch (event.type) {
    case 'customer.subscription.created':
    case 'customer.subscription.updated': {
      const subscription = event.data.object as Stripe.Subscription;
      const userId = parseInt(subscription.metadata.userId || '0');
      const planId = subscription.metadata.planId || 'basic';
      const maxAnalyses = parseInt(subscription.metadata.maxAnalyses || '50');
      
      if (userId) {
        await firestoreStorage.updateUserSubscription(userId, subscription.id, planId, maxAnalyses);
      }
      break;
    }
    
    case 'customer.subscription.deleted': {
      const subscription = event.data.object as Stripe.Subscription;
      const userId = parseInt(subscription.metadata.userId || '0');
      
      if (userId) {
        // Reset to free plan
        await firestoreStorage.updateUserSubscription(userId, '', 'free', 1);
      }
      break;
    }
    
    case 'invoice.payment_succeeded': {
      const invoice = event.data.object as Stripe.Invoice;
      if (invoice.subscription) {
        const subscription = await stripe.subscriptions.retrieve(invoice.subscription as string);
        const userId = parseInt(subscription.metadata.userId || '0');
        
        if (userId) {
          // Reset analysis count for the new billing period
          await firestoreStorage.updateUser(userId, { analysisCount: 0 } as any);
        }
      }
      break;
    }
    
    default:
      console.log(`Unhandled event type: ${event.type}`);
  }
  
  res.json({ received: true });
};

// Check remaining analyses
export const getRemainingAnalyses = async (req: Request, res: Response) => {
  try {
    // Check if user is authenticated
    if (!req.session || !req.session.userId) {
      return res.status(401).json({ error: 'You must be logged in to check your subscription' });
    }
    
    const userId = req.session.userId;
    const user = await firestoreStorage.getUser(userId);
    
    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }
    
    const remainingAnalyses = await firestoreStorage.getRemainingAnalyses(user.id);
    
    res.json({
      remainingAnalyses,
      maxAnalyses: (user as any).maxAnalyses || 1,
      analysisCount: (user as any).analysisCount || 0,
      planType: (user as any).planType || 'free'
    });
  } catch (error: any) {
    res.status(500).json({ error: `Error checking subscription: ${error.message}` });
  }
};

// Increment user's analysis count
export const incrementAnalysisCount = async (req: Request, res: Response) => {
  try {
    // Check if user is authenticated
    if (!req.session || !req.session.userId) {
      return res.status(401).json({ error: 'You must be logged in' });
    }
    
    const userId = req.session.userId;
    const user = await firestoreStorage.getUser(userId);
    
    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }
    
    // Check if user has remaining analyses
    const remainingAnalyses = await firestoreStorage.getRemainingAnalyses(user.id);
    
    if (remainingAnalyses <= 0) {
      return res.status(403).json({ 
        error: 'No analyses remaining on your plan',
        remainingAnalyses: 0,
        maxAnalyses: (user as any).maxAnalyses || 1,
        analysisCount: (user as any).analysisCount || 0,
        planType: (user as any).planType || 'free'
      });
    }
    
    // Increment the analysis count
    const updatedUser = await firestoreStorage.incrementAnalysisCount(user.id);
    
    if (!updatedUser) {
      return res.status(404).json({ error: 'Failed to update user' });
    }
    
    // Calculate new remaining analyses
    const newRemainingAnalyses = await firestoreStorage.getRemainingAnalyses(user.id);
    
    res.json({
      remainingAnalyses: newRemainingAnalyses,
      maxAnalyses: (updatedUser as any).maxAnalyses || 1,
      analysisCount: (updatedUser as any).analysisCount || 0,
      planType: (updatedUser as any).planType || 'free'
    });
  } catch (error: any) {
    res.status(500).json({ error: `Error incrementing analysis count: ${error.message}` });
  }
};