# MOKTA WACH Promotion App

A promotional web application for MOKTA WACH that allows users to spin a wheel and win discounts. The application supports both English and Arabic languages.

## Features

- User information collection form
- Google Maps integration for location display
- Interactive discount wheel with random rewards
- QR code generation for discount redemption
- WhatsApp integration for sharing discounts
- Admin panel with password protection
- Bilingual support (English and Arabic)

## Run Locally

**Prerequisites:** Node.js

1. Install dependencies:
   ```
   npm install
   ```

2. Set up environment variables:
   - Copy `.env.example` to `.env.local`
   - Replace `YOUR_API_KEY_HERE` with your actual Gemini API key (if needed)

3. Run the app:
   ```
   npm run dev
   ```

4. Open your browser and navigate to:
   ```
   http://localhost:5173
   ```

## Hosting on GitHub Pages

This project is configured to be hosted on GitHub Pages. Follow these steps to upload and deploy your app:

### 1. Upload to GitHub

1. Install Git from [git-scm.com](https://git-scm.com/downloads)

2. Open a terminal or command prompt and navigate to the project directory

3. Initialize a Git repository:
   ```
   git init
   ```

4. Add all files to the repository:
   ```
   git add .
   ```

5. Commit the changes:
   ```
   git commit -m "Initial commit"
   ```

6. Create a new repository on GitHub:
   - Go to [github.com](https://github.com)
   - Sign in to your account
   - Click on the '+' icon in the top right and select 'New repository'
   - Name your repository (e.g., "mokta-wach-promotion")
   - Leave it as a public repository
   - Do not initialize with README, .gitignore, or license
   - Click 'Create repository'

7. Connect your local repository to GitHub (replace USERNAME with your GitHub username):
   ```
   git remote add origin https://github.com/USERNAME/mokta-wach-promotion.git
   ```

8. Push your code to GitHub:
   ```
   git push -u origin master
   ```
   (or `git push -u origin main` depending on your default branch name)

### 2. Deploy to GitHub Pages

1. Go to your GitHub repository

2. Click on "Settings" tab

3. In the left sidebar, click on "Pages"

4. Under "Build and deployment" section:
   - Source: Select "GitHub Actions"
   - You should see a suggestion for a workflow based on your project type
   - Click on "Configure" for the suggested workflow

5. The workflow file is already included in your repository (`.github/workflows/deploy.yml`), so GitHub will use it automatically

6. Wait for the GitHub Actions workflow to complete (this may take a few minutes)

7. Once deployed, your site will be available at:
   ```
   https://USERNAME.github.io/mokta-wach-promotion/
   ```
   (replace USERNAME with your GitHub username)

### Important Notes

- The `vite.config.js` file has been configured with a base path for GitHub Pages. If your repository name is different from "mokta-wach-promotion", you'll need to update the `base` property in the config file.

- The app includes special routing for GitHub Pages to handle client-side routing in single-page applications.

- If you make changes to your code, simply commit and push them to GitHub. The GitHub Actions workflow will automatically rebuild and redeploy your site.
