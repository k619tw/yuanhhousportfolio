Yuanhhou UI — component package

Quick start

1. From repo root:

```bash
cd packages/ui
npm install
npm run dev
```

2. Open `http://localhost:5173` to view the demo.

## GitHub Pages Deployment

This repository is configured to automatically deploy to GitHub Pages when changes are pushed to the `main` branch.

### How it works:
1. The `.github/workflows/deploy.yml` workflow automatically builds and deploys the app
2. The build output is deployed to GitHub Pages
3. Your site will be available at: `https://k619tw.github.io/`

### To deploy:
1. Merge your changes to the `main` branch
2. The GitHub Actions workflow will automatically build and deploy
3. Wait a few minutes for the deployment to complete
4. Visit your site at the URL above

### Manual build:
```bash
cd packages/ui
npm run build:app
```

Notes
- This demo imports token files from the repository root (`tokens-typography.css`, `tokens-sizing.css`, `colours.css`).
- You should run `npm install` inside `packages/ui` to install dev deps before running `npm run dev`.
- The dist folder is excluded from git but is built during CI/CD deployment.
