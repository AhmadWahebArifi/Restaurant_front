# GitHub Pages Deployment Guide

## Prerequisites
1. Make sure your project is pushed to a GitHub repository
2. Install gh-pages package: `npm install --save-dev gh-pages`

## Steps to Deploy

### 1. Update Configuration Files

**Update `package.json`:**
- Replace `[your-github-username]` with your actual GitHub username
- Replace `[your-repo-name]` with your actual repository name

**Update `vite.config.js`:**
- Replace `[your-repo-name]` with your actual repository name

### 2. Install gh-pages
```bash
npm install --save-dev gh-pages
```

### 3. Deploy to GitHub Pages
```bash
npm run deploy
```

### 4. Configure GitHub Pages
1. Go to your GitHub repository
2. Click on "Settings"
3. Scroll down to "Pages" section
4. Under "Source", select "Deploy from a branch"
5. Select "gh-pages" branch and "/ (root)" folder
6. Click "Save"

### 5. Access Your App
Your app will be available at: `https://[your-github-username].github.io/[your-repo-name]`

## Important Notes

### API Configuration
Since your app makes API calls to `localhost:8000`, you'll need to:

1. **Option 1: Deploy your backend API** to a hosting service (Heroku, Railway, etc.)
2. **Option 2: Use a mock API** for demonstration purposes
3. **Option 3: Update the API URL** to point to your deployed backend

### Environment Variables
Create a `.env` file for production API URL:
```
VITE_API_URL=https://your-backend-url.com
```

## Troubleshooting

### If the app freezes:
- Check browser console for errors
- Verify API endpoints are accessible
- Ensure all environment variables are set correctly

### If routes don't work:
- Make sure you're using HashRouter instead of BrowserRouter for GitHub Pages
- Update the base path in vite.config.js

### If assets don't load:
- Check that the base path is correctly set in vite.config.js
- Verify that all image paths are relative 