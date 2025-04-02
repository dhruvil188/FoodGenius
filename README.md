# Recipe Snap: AI-Powered Food Image Analysis & Recipe Generator

Recipe Snap is a cutting-edge web application that transforms food discovery and cooking experiences through AI technology. Simply upload an image of any food dish, and Recipe Snap will identify it and generate comprehensive recipe information using Google's Gemini AI.

![Recipe Snap Screenshot](https://i.imgur.com/placeholder.png)

## 🌟 Features

### Core Functionality
- **AI Image Analysis**: Upload images or take photos directly through your device camera
- **Instant Recipe Generation**: Get complete recipes based on food images with Google's Gemini AI
- **Comprehensive Recipe Details**: All recipes include:
  - Ingredient lists with measurements and groupings
  - Step-by-step cooking instructions
  - Detailed nutritional information
  - Suggested kitchen equipment
  - Cultural background and context
  - Cooking science explanations
  - Sensory guidance for perfect results
  - Presentation tips
  - Recipe variations
  - Complementary side dishes

### Enhanced User Experience
- **Extensive Recipe Library**: Browse 100+ pre-loaded recipes across global cuisines
- **Health Benefits Analysis**: Six key health benefits for each recipe based on ingredients and nutrients
- **Cost Estimation**: Per-serving cost estimates with ingredient breakdowns and budget-friendly alternatives
- **YouTube Integration**: Related cooking videos for visual learning
- **Save Favorites**: Save and organize your favorite recipes
- **Responsive Design**: Beautiful interface that works on mobile, tablet, and desktop
- **Rich Animations**: Smooth transitions and celebratory animations for completed steps

### User Management
- **Firebase Authentication**: Secure Google-based login system
- **Protected Features**: Image analysis requires login while recipe library is freely browsable

## 🔧 Technology Stack

### Frontend
- **React 18** with TypeScript for UI components
- **Tailwind CSS** for responsive styling
- **Shadcn UI** for consistent design components
- **Framer Motion** for smooth animations
- **React Hook Form** with Zod for form validation
- **React Query** for efficient data fetching
- **Webcam API** for in-browser photo capture
- **Canvas Confetti** for celebratory animations

### Backend
- **Node.js** with Express for API endpoints
- **In-memory Data Storage** with PostgreSQL option
- **Firebase Auth** for user authentication
- **Google Gemini API** (1.5 Pro Vision) for AI image analysis
- **YouTube Data API** for related cooking videos

### DevOps & Infrastructure
- **Vite** for fast development and optimized builds
- **TypeScript** for type safety across the application
- **Drizzle ORM** for database interactions
- **Zod** for runtime type validation
- **Express Session** for session management

## 📋 Detailed Feature Breakdown

### Recipe Analysis Components
Each recipe generated or displayed includes:

- **Basic Information**:
  - Recipe name and difficulty level
  - Preparation and cooking time
  - Number of servings
  - Cultural origin
  
- **Ingredients**:
  - Organized by recipe sections when applicable
  - Precise measurements (metric and imperial)
  - Alternatives for dietary restrictions
  
- **Instructions**:
  - Numbered step-by-step guide
  - Interactive completion tracking
  - Critical techniques highlighted
  
- **Nutritional Information**:
  - Calories, proteins, carbs, and fats
  - Vitamins and minerals
  - Dietary classifications (vegetarian, vegan, gluten-free, etc.)
  
- **Health Benefits**:
  - Six detailed health advantages
  - Target audience information
  - Nutritional highlights
  
- **Cost Analysis**:
  - Budget classification (budget, moderate, premium)
  - Per-serving cost estimation
  - Budget-friendly alternatives
  - Cost breakdown visualization
  
- **Kitchen Equipment**:
  - Essential tools needed
  - Alternative equipment options
  
- **Cooking Techniques**:
  - Detailed explanations of specialized methods
  - Common pitfalls and how to avoid them
  
- **Cultural Context**:
  - Origin and history of the dish
  - Traditional serving suggestions
  - Cultural significance
  
- **Presentation Guidance**:
  - Plating recommendations
  - Garnishing ideas
  - Photography tips
  
- **Recipe Variations**:
  - Dietary adaptations (vegan, gluten-free, etc.)
  - Seasonal variations
  - Regional variations
  
- **Side Dish Recommendations**:
  - Complementary dishes
  - Beverage pairings

### UI/UX Details
- **Tabbed Interface**: Organized content for easy navigation
- **Progress Tracking**: Visual indicators for cooking steps
- **Responsive Grid Layout**: Adapts to all screen sizes
- **Motion Effects**: Subtle animations enhance the user experience
- **Celebratory Animations**: Visual rewards for completing recipes
- **Toast Notifications**: Informative feedback for user actions

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ and npm
- Firebase account (for authentication)
- Google Gemini API key
- YouTube Data API key

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/recipe-snap.git
   cd recipe-snap
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory with the following variables:
   ```
   # Firebase Configuration
   VITE_FIREBASE_API_KEY=your-firebase-api-key
   VITE_FIREBASE_PROJECT_ID=your-firebase-project-id
   VITE_FIREBASE_APP_ID=your-firebase-app-id

   # API Keys
   GEMINI_API_KEY=your-gemini-api-key
   YOUTUBE_API_KEY=your-youtube-api-key
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser** and navigate to http://localhost:5000

### Firebase Configuration
1. Create a project at [Firebase Console](https://console.firebase.google.com/)
2. Enable Google Authentication in the Authentication > Sign-in method section
3. Add your development domain to the Authorized Domains list

### Google Gemini API Setup
1. Visit [Google AI Studio](https://ai.google.dev/) to get your API key
2. The application is configured to use the Gemini 1.5 Pro Vision model

### YouTube API Configuration
1. Create a project in the [Google Cloud Console](https://console.cloud.google.com/)
2. Enable the YouTube Data API v3
3. Create API credentials and restrict them to the YouTube Data API

## 📂 Project Structure

```
recipe-snap/
├── client/                # Frontend code
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── contexts/      # React contexts (Auth, etc.)
│   │   ├── data/          # Static data and sample recipes
│   │   ├── hooks/         # Custom React hooks
│   │   ├── lib/           # Utility functions
│   │   ├── pages/         # Page components
│   │   └── types/         # TypeScript type definitions
│   ├── public/            # Static assets
│   └── index.html         # HTML entry point
├── server/                # Backend code
│   ├── index.ts           # Server entry point
│   ├── routes.ts          # API endpoints
│   ├── storage.ts         # Data storage implementation
│   ├── services/          # Service integrations
│   └── mockData.ts        # Development data
├── shared/                # Shared code between frontend and backend
│   └── schema.ts          # Data schemas and types
├── scripts/               # Utility scripts
├── .env.example           # Example environment variables
├── package.json           # Project dependencies
├── tailwind.config.ts     # Tailwind CSS configuration
└── vite.config.ts         # Vite configuration
```

## 🖥️ Key Components

### Frontend Pages
- **Home**: Main page with hero section and image upload functionality
- **Library**: Browse pre-loaded recipes
- **Recipe Page**: Detailed view of a single recipe
- **Authentication**: Login and registration

### Backend API Endpoints
- `POST /api/analyze-image`: Process food images with Gemini AI
- `GET /api/recipes`: Retrieve pre-loaded recipes
- `POST /api/recipes`: Save a recipe to favorites
- `GET /api/recipes/:id`: Get a specific recipe
- `PATCH /api/recipes/:id/favorite`: Toggle favorite status
- `DELETE /api/recipes/:id`: Remove a saved recipe
- `GET /api/auth/me`: Get current user information

## 🔍 Development Features

### State Management
- React Context API for global state
- TanStack Query for server state management

### Testing
- Component testing with React Testing Library
- API endpoint testing with Supertest

### Code Quality
- ESLint for code linting
- Prettier for consistent formatting
- TypeScript for type safety

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

See the [contributing guidelines](CONTRIBUTING.md) for more details.

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👏 Acknowledgments

- [Google Gemini AI](https://ai.google.dev/) for powering the image recognition and recipe generation
- [Shadcn UI](https://ui.shadcn.com/) for the beautiful component library
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [React](https://reactjs.org/) for the frontend library
- [Firebase](https://firebase.google.com/) for authentication
- [Replit](https://replit.com/) for the development environment

## 📞 Contact

For questions or support, please contact us at argonpatel835@gmail.com