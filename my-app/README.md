### Getting started with Create React App
This project was bootstrapped with Create React App.

## Available scripts
In the project directory, you can run:

# npm start
Runs the app in development mode.
Open http://localhost:3000 to view it in your browser.

The page will reload when you make changes.
You may also see any lint errors in the console.

# npm test
Launches the test runner in non-interactive mode with code coverage.Use this to run all tests and generate coverage reports.

# npm run build
Builds the app for production to the build folder.
See the section about deployment.

# npm run build-npm
Custom build script for creating a production-ready distribution using Babel.

It does the following:

Removes the dist folder.

Recreates the dist folder.

Transpiles the src code using Babel and copies all necessary files to dist.

This is useful for projects designed to publish as npm packages.

# npm run eject
Note: This is a one-way operation. Once you eject, you can't go back!

Removes the single build dependency from your project. You gain full control of configuration files (e.g., Webpack, Babel, ESLint), allowing complete customization. However, you will need to manage dependencies manually.

Use this script with caution.

# npm run predeploy
Runs npm run build before deploying your app.
This script ensures the app is ready for deployment with a fresh production build.

# npm run deploy
Deploys the app to GitHub Pages using the gh-pages package.
Make sure your repository is correctly configured for GitHub Pages deployment before running this command.

# npm run jsdoc
Generates documentation for your project using JSDoc.
It takes the README.md file as the root documentation and uses jsdoc.config.json for additional configuration.
The documentation is stored in the public/docs folder.