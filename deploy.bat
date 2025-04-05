@echo off
echo Building Angular application...
ng build --configuration production --base-href=/portfolio/

echo "Checking out main branch..."
git checkout main

echo "Checking if gh-pages branch exists..."
if (git show-ref --verify --quiet refs/heads/gh-pages) {
  echo "Deleting existing gh-pages branch..."
  git branch -D gh-pages
} else {
  echo "gh-pages branch does not exist."
}

echo "Creating orphan gh-pages branch..."
git checkout --orphan gh-pages
echo Copying dist folder contents to root...
Copy-Item -Path C:\dev\tpierce-portfolio\dist\tpierce-portfolio\* -Destination C:\dev\tpierce-portfolio\ -Recurse -Force
echo Adding all files to gh-pages branch...
git add .
echo Committing changes to gh-pages branch...
git commit -m "deploy to github pages"
echo Pushing gh-pages branch to GitHub...
git push origin gh-pages --force
echo Switching back to main branch...
git checkout main
echo Deployment process complete.