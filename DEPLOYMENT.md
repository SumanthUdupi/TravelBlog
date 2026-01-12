# Deployment Guide

This repository is configured for automated deployment to **GitHub Pages** using GitHub Actions.

## Prerequisites

### 1. Repository Settings
To ensure the deployment workflow runs successfully, you must configure your repository settings on GitHub:

1.  Go to **Settings** > **Actions** > **General**.
2.  Under **Workflow permissions**, select **Read and write permissions**.
3.  Click **Save**.

### 2. GitHub Pages Settings
After the *first* successful deployment:
1.  Go to **Settings** > **Pages**.
2.  Under **Build and deployment** > **Source**, ensure it is set to **Deploy from a branch**.
3.  Set the branch to `gh-pages` and folder to `/` (root).
4.  Click **Save**.

## Workflow Overview

The workflow file is located at `.github/workflows/deploy.yml`. It performs the following steps:

1.  **Setup Python**: Installs Python and dependencies (`markdown`, `jinja2`, `beautifulsoup4`).
2.  **Generate Static Content**: Runs `build_site.py` to generate `data/posts.json` and static HTML pages into the `public/` directory.
3.  **Setup Node.js**: Installs Node.js v20.
4.  **Build React App**: Runs `npm run build` (Vite), which bundles the app and copies `public/` (including generated data) to `dist/`.
5.  **SPA Support**: Copies `index.html` to `404.html` to handle client-side routing on GitHub Pages.
6.  **Deploy**: Uploads the `dist/` folder to the `gh-pages` branch.

## Manual Deployment

You can manually trigger a deployment from the Actions tab:
1.  Go to the **Actions** tab in your repository.
2.  Select **Deploy to GitHub Pages**.
3.  Click **Run workflow**.

## Troubleshooting

-   **404 Errors on sub-pages**: Ensure the `404.html` step in the workflow is passing.
-   **Missing Blog Posts**: Check the "Generate Static Site Content" step logs. If `build_site.py` fails, `posts.json` won't be created.
-   **Permissions Error**: Double-check the "Read and write permissions" setting in step 1.
