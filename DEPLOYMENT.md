# Deployment Guide

This repository is configured to automatically deploy to GitHub Pages using GitHub Actions.

## 🚀 How it Works

The deployment pipeline is defined in `.github/workflows/deploy.yml`. It runs automatically whenever you push code to the `main` branch.

### The Pipeline Steps:
1.  **Environment Setup**: Installs Node.js and Python.
2.  **Content Build**: Runs `build_site.py` to generate static blog pages and `data/posts.json` from markdown files.
3.  **Application Build**: Runs `npm run build` (Vite) to bundle the React application and assets.
4.  **Deployment**: Uploads the `dist` directory to GitHub Pages.

## 🛠 Setup Requirements

To ensure the deployment works correctly on your GitHub repository:

1.  **Go to Settings > Pages** in your repository.
2.  Under **Build and deployment**, select **GitHub Actions** as the source.
3.  Ensure your repository visibility allows for GitHub Pages (Public is free, Private requires Pro/Enterprise for Pages usually).

## 🌍 Local Development

The `vite.config.js` has been configured with `base: '/TravelBlog/'` to match the GitHub Pages URL structure.

When running locally with `npm run dev`, Vite typically handles the base path correctly. If you encounter issues accessing the site locally:
- Try accessing `http://localhost:5173/TravelBlog/` explicitly.
- Or temporarily comment out the `base` line in `vite.config.js` for local dev if absolutely necessary (but remember to comment it back in for deployment!).

## 🔍 Troubleshooting

**Deployment Failed?**
- Check the "Actions" tab in your repository.
- Click on the failed run to see the logs.
- Common issues:
    - **Linting Errors**: The build might fail if `npm run build` encounters linting errors. Fix them locally.
    - **Missing Secrets**: This workflow does not currently require any secrets, but if you add API integrations, ensure secrets are added in Repo Settings.

## 📦 Artifacts

Each successful build uploads an artifact that you can download from the Actions run summary to inspect exactly what was deployed.
