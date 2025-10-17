#!/bin/sh

# Abort on errors
set -e

# 1. Build the project
echo "Building the project..."
npm run build

# 2. Navigate into the build output directory
cd dist

# 3. Initialize a new git repository in the build folder
# This is a temporary, local-only repository
git init

# 4. Create the gh-pages branch in this temporary repo
git checkout -B gh-pages

# 5. Add all the built files
git add -A

# 6. Commit the files
git commit -m "Deploy: `date`"

# 7. Force push from this temporary repo's gh-pages branch to the
#    gh-pages branch of your actual remote repository on GitHub.
#    Replace the URL with your repository's URL.
echo "Pushing to GitHub Pages..."
git push -f https://github.com/Jhietechz/emmanuelyegon-portfolio.git gh-pages

# 8. Clean up by returning to the parent directory
cd -

echo "Deployment successful!"