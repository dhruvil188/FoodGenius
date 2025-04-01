import Stripe from 'stripe';
import { SubscriptionPlan } from '@shared/schema';

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('Missing required Stripe secret: STRIPE_SECRET_KEY');
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16' as any,
});

// Define subscription plans with our pricing structure
export const subscriptionPlans: SubscriptionPlan[] = [
  {
    id: 'basic_monthly',
    name: 'Basic',
    description: 'Perfect for casual home cooks',
    price: 8,
    currency: 'usd',
    interval: 'month',
    credits: 50,
    features: [
      '50 recipe analyses per month',
      'Save favorite recipes',
      'Access to recipe library',
      'Email support'
    ]
  },
  {
    id: 'premium_monthly',
    name: 'Premium',
    description: 'Great for enthusiasts who cook frequently',
    price: 12,
    currency: 'usd',
    interval: 'month',
    credits: 100,
    features: [
      '100 recipe analyses per month',
      'Save favorite recipes',
      'Access to recipe library',
      'Priority email support',
      'Weekly recipe recommendations'
    ],
    mostPopular: true
  },
  {
    id: 'unlimited_monthly',
    name: 'Unlimited',
    description: 'For professional chefs and restaurants',
    price: 25,
    currency: 'usd',
    interval: 'month',
    credits: 999999, // Effectively unlimited
    features: [
      'Unlimited recipe analyses',
      'Save favorite recipes',
      'Access to recipe library',
      'Priority email support',
      'Weekly recipe recommendations',
      'Bulk recipe analysis',
      'Custom recipe adjustments'
    ]
  },
];

/**
 * Create a Stripe customer
 * @param email Customer email
 * @param name Customer name
 * @returns Stripe Customer
 */
export async function createCustomer(email: string, name?: string): Promise<Stripe.Customer> {
  return await stripe.customers.create({
    email,
    name
  });
}

/**
 * Get a Stripe customer by ID
 * @param customerId Stripe customer ID
 * @returns Stripe Customer
 */
export async function getCustomer(customerId: string): Promise<Stripe.Customer> {
  return await stripe.customers.retrieve(customerId) as Stripe.Customer;
}

/**
 * Create a subscription checkout session
 * @param customerId Stripe customer ID
 * @param planId Plan ID from subscriptionPlans
 * @returns Checkout session with client secret
 */
export async function createSubscriptionSession(customerId: string, planId: string) {
  // Find the subscription plan
  const plan = subscriptionPlans.find(p => p.id === planId);
  if (!plan) {
    throw new Error(`Invalid plan ID: ${planId}`);
  }

  // Create a new price if it doesn't exist (in production, you'd create these beforehand)
  const price = await createOrRetrievePrice(plan);

  // Create a subscription
  const subscription = await stripe.subscriptions.create({
    customer: customerId,
    items: [{ price: price.id }],
    payment_behavior: 'default_incomplete',
    payment_settings: { save_default_payment_method: 'on_subscription' },
    expand: ['latest_invoice.payment_intent'],
  });

  const invoice = subscription.latest_invoice as Stripe.Invoice;
  const paymentIntent = invoice.payment_intent as Stripe.PaymentIntent;

  return {
    subscriptionId: subscription.id,
    clientSecret: paymentIntent.client_secret,
    status: subscription.status,
  };
}

/**
 * Get subscription details
 * @param subscriptionId Stripe subscription ID
 * @returns Subscription details
 */
export async function getSubscription(subscriptionId: string): Promise<Stripe.Subscription> {
  return await stripe.subscriptions.retrieve(subscriptionId);
}

/**
 * Cancel a subscription
 * @param subscriptionId Stripe subscription ID
 * @returns Canceled subscription
 */
export async function cancelSubscription(subscriptionId: string): Promise<Stripe.Subscription> {
  return await stripe.subscriptions.cancel(subscriptionId);
}

/**
 * Create or retrieve a price for a plan
 */
async function createOrRetrievePrice(plan: SubscriptionPlan): Promise<Stripe.Price> {
  // In production, you'd have a more robust solution for this
  // Here we're creating a price on-the-fly for simplicity
  
  // Check if a price already exists for this plan
  const prices = await stripe.prices.list({
    lookup_keys: [plan.id],
    active: true,
    limit: 1,
  });

  if (prices.data.length > 0) {
    return prices.data[0];
  }

  // Create a new price
  return await stripe.prices.create({
    currency: plan.currency,
    unit_amount: Math.round(plan.price * 100), // Convert to cents
    recurring: {
      interval: plan.interval,
    },
    product_data: {
      name: `${plan.name} Plan`,
    },
    lookup_key: plan.id,
  });
}

/**
 * Handle Stripe webhook events
 * @param event Stripe webhook event
 */
export async function handleWebhookEvent(event: Stripe.Event) {
  switch (event.type) {
    case 'customer.subscription.created':
    case 'customer.subscription.updated':
      const subscription = event.data.object as Stripe.Subscription;
      // Update user subscription status in your database
      // You would implement this based on your database structure
      break;
    case 'customer.subscription.deleted':
      const canceledSubscription = event.data.object as Stripe.Subscription;
      // Handle subscription cancellation
      break;
    case 'invoice.payment_succeeded':
      const invoice = event.data.object as Stripe.Invoice;
      // Handle successful payment, perhaps granting more credits
      break;
    case 'invoice.payment_failed':
      const failedInvoice = event.data.object as Stripe.Invoice;
      // Handle failed payment
      break;
    default:
      console.log(`Unhandled event type: ${event.type}`);
  }
}