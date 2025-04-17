# Deploying Recipe Snap to Vercel

This guide provides step-by-step instructions for deploying your Recipe Snap application to Vercel.

## Prerequisites

- Your GitHub repository contains the latest version of your code
- You have an account on [Vercel](https://vercel.com/)
- You have all required API keys and environment variables

## Deployment Steps

### 1. Connect Your GitHub Repository to Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "Add New" → "Project"
3. Select your GitHub repository 
4. Click "Import"

### 2. Configure Project Settings

Configure your project with the following settings:

- **Framework Preset**: Other
- **Build Command**: `npm run build`
- **Output Directory**: `dist/public` (This is already set in vercel.json)
- **Install Command**: `npm install`

### 3. Set Environment Variables

Add all your environment variables from your `.env` file to Vercel:

```
GEMINI_API_KEY=your_key_here
YOUTUBE_API_KEY=your_key_here
DATABASE_URL=your_key_here
PGHOST=your_value_here  
PGUSER=your_value_here
PGPASSWORD=your_value_here
PGDATABASE=your_value_here
PGPORT=your_value_here
STRIPE_SECRET_KEY=your_key_here
STRIPE_PREMIUM_PRICE_ID=your_value_here
VITE_FIREBASE_API_KEY=your_key_here
VITE_FIREBASE_APP_ID=your_id_here
VITE_FIREBASE_PROJECT_ID=your_id_here
VITE_STRIPE_PUBLIC_KEY=your_key_here
```

### 4. Deploy Your Application

Click "Deploy" and wait for the build to complete. Vercel will run your build command and deploy the application.

### 5. Post-Deployment Configuration

After deployment, you'll need to:

1. **Configure Firebase**
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Select your project
   - Go to Authentication → Settings → Authorized domains
   - Add your Vercel domain (e.g., `your-app.vercel.app`)

2. **Update Stripe Webhook Settings**
   - Go to [Stripe Dashboard](https://dashboard.stripe.com/webhooks)
   - Update webhook endpoints to point to your new domain

3. **Verify Database Connection**
   - Ensure your Neon PostgreSQL database is accessible from Vercel
   - If needed, update database access rules to allow connections from Vercel's IP range

### 6. Testing Your Deployment

After deployment, test the following functionality:

- User registration and login
- Image uploads and analysis
- Saving recipes
- Chat functionality
- Payment processing

## Troubleshooting

If you encounter issues with your deployment:

1. **Check Build Logs**
   - Review the build logs in Vercel for errors
   - Ensure all dependencies are installed correctly

2. **Environment Variables**
   - Verify all environment variables are correctly set
   - Ensure sensitive variables are properly secured

3. **Database Connection**
   - Check if your database is accessible from Vercel
   - Verify connection strings and credentials

4. **API Integration**
   - Test individual API endpoints to ensure they're working
   - Verify Firebase and Stripe configurations

## Continuous Deployment

Vercel automatically rebuilds your application when you push changes to your GitHub repository. To update your deployed application:

1. Make changes to your code locally
2. Commit and push to GitHub
3. Vercel will automatically deploy the updates

## Custom Domain Setup

To set up a custom domain:

1. Go to Vercel Dashboard → Your Project → Domains
2. Add your custom domain
3. Follow the provided instructions to configure DNS settings