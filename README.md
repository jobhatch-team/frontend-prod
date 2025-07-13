# JobHatch

JobHatch is a comprehensive career development platform that helps job seekers break through isolation and anxiety with daily wins, gamification, and community support.

## Project Overview

JobHatch transforms the job search experience from a source of anxiety to a journey of growth and achievement through:

- 🚀 **AI-powered coaching** and personalized guidance
- 🎮 **Gamified job search** with missions, progress tracking, and rewards
- 👥 **Community support** with accountability partners
- 📊 **Intelligent job matching** and application tools
- 📈 **Visual progress tracking** to maintain motivation

## Project Structure

The project is organized into two self-contained components:

1. **Frontend** - A React application in the `frontend/` directory (port 3000)
2. **Backend** - A Flask API server in the `backend/` directory (port 5000)

Each component has its own instructions on how to run it.

## Quick Start

### Backend
```bash
cd backend
pip install -r requirements.txt
python app.py
```

### Frontend
```bash
cd frontend
npm install
npm start
```

Then access the application at http://localhost:3000

## Communication Flow

1. The frontend makes API calls to the backend endpoints
2. The backend processes these requests and returns data
3. The frontend receives and displays the data to users
4. For user interactions, the frontend sends updates to the backend
5. The backend saves these updates to the appropriate files

## Features

### Core Features

- **Career Progress Tracker**: Visual timeline that shows users' journey progress with customized phases
- **PDF Resume Upload & Parsing**: Upload your resume PDF and automatically extract job experiences
- **Resume Improvement with AI**: Use AI to enhance your resume with improved descriptions and suggestions
- **PDF Generation**: Generate professional PDF resumes with your improved content
- **Cover Letter Enhancement**: Upload cover letters and improve them using AI
- **Experience Management**: View, edit, and manage your work experiences

### Career Progress Tracker

The Career Progress Tracker is a visual component that shows users their progress through the job hunt journey, featuring:

- Overall progress percentage display
- Category-specific progress bars (Resume, Applications, Interviews)
- Visual timeline of the career "hatching" process with four phases:
  1. Preparation - Complete profile, optimize resume, set goals
  2. Application - Apply to jobs, network, attend events
  3. Interviews - Prepare for interviews, practice, follow up
  4. Offer & Success - Evaluate offers, negotiate, transition

## API Endpoints

The backend exposes the following API endpoints:

- `GET /api/health` - Health check endpoint
- `GET /api/user/:userId/profile` - Get user profile data
- `GET /api/user/:userId/progress/ratings` - Get user ratings data
- `POST /api/user/:userId/progress/ratings` - Update user ratings data
- `GET /api/user/:userId/progress/todos` - Get user todos data

## Development

### Prerequisites
- Node.js (v14+) for the frontend
- Python (v3.8+) for the backend
- npm or yarn for frontend package management
- pip for Python package management

### Development Setup

#### Windows
```bash
# Run the setup script
dev-setup.bat
```

#### Unix/Mac
```bash
# Make the script executable
chmod +x dev-setup.sh

# Run the setup script
./dev-setup.sh
```

Or manually:

```bash
# Terminal 1 - Backend
cd backend
pip install -r requirements.txt
python app.py

# Terminal 2 - Frontend
cd frontend
npm install
npm start
```

### Technical Structure

#### Frontend Components
- React application structure for modern SPA experience
- Career Progress Tracker for visualizing user journey
- Resume and cover letter editors with AI integration
- Job search and buddy matching interfaces

#### Backend Components
- `server.py`: Main Flask server that handles API requests
- `parser.py`: PDF parsing functionality using pdfplumber and PyPDF2
- `resume_editor.py`: Resume improvement with GPT integration
- `api_handler.py`: API endpoints for frontend-backend communication

## Deployment

### Deploying to Vercel

The application is designed to be easily deployed to Vercel with serverless functions handling backend operations.

1. **Install Vercel CLI** (optional but recommended):
   ```
   npm install -g vercel
   ```

2. **Login to Vercel**:
   ```
   vercel login
   ```

3. **Deploy to Vercel**:
   ```
   vercel --prod
   ```
   
   Alternatively, you can connect your GitHub repository to Vercel for automatic deployments.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- OpenAI for the GPT API
- React and Flask for the frontend and backend frameworks
- ReportLab for PDF generation

## Backend Architecture for Vercel

The application uses Vercel serverless functions for backend operations:

- `/api/users.js` - Handles user data operations (GET, POST, PUT, DELETE)
- `/api/process-resume.js` - Handles resume processing

In production, user data is stored in memory during the function execution. For a production environment, consider using:

- Vercel KV Storage
- MongoDB Atlas
- Firebase Firestore
- AWS S3

## Static Files

The static files (HTML, CSS, JS) are served directly by Vercel's CDN.

## Environment Variables

For a production deployment, you might want to set the following environment variables in your Vercel project:

- `NODE_ENV` - Set to `production` for production deployments
- `DATABASE_URL` - If you integrate a database
- `STORAGE_URL` - If you use external storage for files

Vercel 
23333