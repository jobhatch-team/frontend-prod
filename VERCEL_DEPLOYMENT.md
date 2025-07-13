# Vercel Deployment Guide for JobHatch

This guide explains how to deploy the JobHatch application on Vercel.

## Project Structure

The JobHatch project is structured as a monorepo with:

- `frontend/`: React application
- `backend/`: Flask API
- `api/`: Proxy for API requests in production

## Setup Steps

### 1. GitHub Repository

First, push your code to a GitHub repository.

### 2. Vercel Account

Sign up for a [Vercel account](https://vercel.com/signup) if you don't have one.

### 3. Import Project

1. Go to the Vercel dashboard
2. Click "Add New" → "Project"
3. Select your GitHub repository
4. Configure the project:
   - Framework Preset: Other
   - Root Directory: ./
   - Build Command: `cd frontend && npm install && npm run build`
   - Output Directory: `frontend/build`

### 4. Environment Variables

Add the following environment variables:

- `API_URL`: URL of your backend API (e.g., `https://jobhatch-backend.vercel.app`)

### 5. Deploy Backend Separately

1. Create a new project in Vercel
2. Configure the project:
   - Framework Preset: Python
   - Root Directory: `backend/`
   - Build Command: `pip install -r requirements.txt`
   - Output Directory: Not needed for Python

### 6. Link Frontend and Backend

Once both are deployed, update the `API_URL` environment variable in the frontend project to point to your backend URL.

## Troubleshooting

### Missing Public Directory

If you get the error "No Output Directory named 'public' found after the Build completed", make sure:

1. The build command correctly runs `npm run build` in the frontend directory
2. The output directory is set to `frontend/build`
3. The postbuild script runs to copy static files to the build directory

### API Connection Issues

If the frontend cannot connect to the backend:

1. Check the `API_URL` environment variable
2. Ensure CORS is properly configured in the backend
3. Verify that the API proxy is correctly set up

## Vercel Configuration Files

The project includes these Vercel configuration files:

- `vercel.json`: Root configuration for the monorepo
- `frontend/vercel.json`: Frontend-specific configuration
- `backend/vercel.json`: Backend-specific configuration
- `api/proxy.js`: API proxy for production

## Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Deploying Flask on Vercel](https://vercel.com/guides/deploying-flask-with-vercel)
- [React on Vercel](https://vercel.com/guides/deploying-react-with-vercel) 