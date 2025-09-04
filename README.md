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

## Uploading to GitHub

To upload this project to GitHub, follow these steps:

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

9. Refresh your GitHub repository page to see your uploaded code
