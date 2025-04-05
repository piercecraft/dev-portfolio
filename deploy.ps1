# Build the project
ng build --configuration production

# Deploy to GitHub Pages
npx angular-cli-ghpages --dir=dist/dev-portfolio --no-silent

# Verify deployment
Start-Process "https://piercecraft.github.io/dev-portfolio/"