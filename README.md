# Recipe Snap

Recipe Snap is an AI-powered culinary platform that analyzes food images to provide comprehensive recipe information. Simply take a photo of any dish, and Recipe Snap will identify it and provide detailed cooking instructions, ingredient lists, nutritional information, and more.

## Features

- **Image Analysis**: Upload or take photos of food to get AI-powered recipe identification
- **Comprehensive Recipes**: Get detailed ingredients, instructions, nutritional information, and more
- **Recipe Library**: Browse a collection of pre-loaded recipes without needing to upload images
- **User Authentication**: Firebase-based authentication for secure user access
- **Responsive Design**: Works on mobile, tablet, and desktop devices
- **Health Benefits Analysis**: Understand the nutritional benefits of each recipe
- **Cost Estimation**: Get cost breakdowns and budget-friendly alternatives

## Technology Stack

- **Frontend**: React, TypeScript, Tailwind CSS, Framer Motion, Shadcn UI
- **Backend**: Node.js, Express
- **AI**: Google Gemini API for image analysis and recipe generation
- **Authentication**: Firebase Authentication
- **Video Integration**: YouTube API for related cooking videos
- **Data Storage**: In-memory storage with PostgreSQL integration option

## Getting Started

### Prerequisites

- Node.js 16+
- npm or yarn
- Firebase account
- Google Gemini API key
- YouTube API key

### Installation

1. Clone this repository
   ```
   git clone https://github.com/yourusername/recipe-snap.git
   ```

2. Install dependencies
   ```
   npm install
   ```

3. Create a `.env` file in the root directory using the `.env.example` template and add your API keys

4. Start the development server
   ```
   npm run dev
   ```

### Environment Variables

Copy `.env.example` to a new file named `.env` and fill in your actual API keys and configuration values:

- Firebase configuration (for authentication)
- Gemini API key (for AI image analysis)
- YouTube API key (for recipe videos)

## Project Structure

- `/client`: Frontend React application
- `/server`: Backend Express server
- `/shared`: Shared types and schemas
- `/scripts`: Utility scripts

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Google Gemini AI for powering the image recognition
- Shadcn UI for the component library
- Replit for development environment