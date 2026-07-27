# Deployment Guide

Your portfolio is ready for the world! Below are the steps to push to GitHub and deploy to Vercel.

## 1. Push to GitHub
I have already initialized git and committed your files locally. To push them to GitHub, follow these steps:

1. Create a new **Public** repository on [GitHub](https://github.com/new).
2. Copy the repository URL (e.g., `https://github.com/your-username/your-repo-name.git`).
3. Provide me with that URL, and I will execute the push for you.

Alternatively, you can run these commands in your terminal:
```bash
git remote add origin YOUR_REPOSITORY_URL
git branch -M main
git push -u origin main
```

## 2. Deploy to Vercel
Once the code is on GitHub, deploying to Vercel is seamless:

1. Go to [Vercel](https://vercel.com/new).
2. Import your GitHub repository.
3. Vercel will automatically detect **Vite** as the framework.
4. Click **Deploy**.
5. Once finished, your site will be live at a `.vercel.app` URL!

## Requirements Met
- **Vite/React**: Configured for high-performance production builds.
- **Environment Variables**: If you have any sensitive keys in `.env.local`, make sure to add them in the Vercel Project Settings.
- **Assets**: All videos and icons are properly bundled for production.
