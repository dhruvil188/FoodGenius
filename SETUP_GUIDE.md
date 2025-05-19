# RecipeSnap Setup Guide

This document provides instructions for setting up and running the RecipeSnap application.

## Prerequisites

Before you begin, ensure you have the following:

- [Node.js](https://nodejs.org/) (v16 or higher) and npm
- A Firebase account for authentication
- A Google Gemini API key for AI features
- PostgreSQL database (this is provided by Replit, but if running locally, you'll need your own)

## Required Environment Variables

The application requires the following environment variables to function properly:

| Variable | Description | How to Obtain |
|----------|-------------|---------------|
| `VITE_FIREBASE_API_KEY` | Firebase API key for authentication | Firebase Console |
| `VITE_FIREBASE_PROJECT_ID` | Firebase project ID | Firebase Console |
| `VITE_FIREBASE_APP_ID` | Firebase application ID | Firebase Console |
| `GEMINI_API_KEY` | Google Gemini API key for AI features | Google AI Studio |

## How to Obtain API Keys

### Firebase Keys

1. Go to the [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or select an existing one
3. Navigate to Project Settings (gear icon near the top left)
4. In the "General" tab, scroll down to "Your apps" section
5. If you haven't already, add a web app to your project
6. After adding the app, you'll see the Firebase configuration object that contains:
   - `apiKey` (use as `VITE_FIREBASE_API_KEY`)
   - `projectId` (use as `VITE_FIREBASE_PROJECT_ID`)
   - `appId` (use as `VITE_FIREBASE_APP_ID`)

### Gemini API Key

1. Go to the [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key" and follow the instructions
4. Copy the generated API key for use as `GEMINI_API_KEY`

## Setting Up the Project

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory with the environment variables listed above:
   ```
   VITE_FIREBASE_API_KEY=your-firebase-api-key
   VITE_FIREBASE_PROJECT_ID=your-firebase-project-id
   VITE_FIREBASE_APP_ID=your-firebase-app-id
   GEMINI_API_KEY=your-gemini-api-key
   ```
4. If running locally (not on Replit), you'll also need to set up PostgreSQL and add:
   ```
   DATABASE_URL=your-postgresql-connection-string
   ```

## Running the Application

Start the development server:
```bash
npm run dev
```

The application should now be running on http://localhost:5000.

## Features

RecipeSnap includes the following features:
- AI-powered recipe generation from food images
- User authentication via Firebase
- Recipe saving and management
- Chat interface for recipe assistance
- Advanced analytics and nutritional information

## Troubleshooting

If you encounter errors:

1. **Firebase Authentication Errors**: Ensure your Firebase project has Authentication enabled and the proper API keys are set
2. **AI Features Not Working**: Verify your Gemini API key is correct and has the necessary permissions
3. **Database Issues**: Check your PostgreSQL connection if running locally

For any other issues, please refer to the project's documentation or open an issue in the repository.