<#
.SYNOPSIS
    Reliable Angular to GitHub Pages Deployment
.DESCRIPTION
    Ensures dependencies are installed before building and deploying
#>

# 1. Validate environment
Write-Host "Verifying git status..."
if ((git branch --show-current) -ne "main") {
    Write-Error "Must be on main branch to deploy"
    exit 1
}

if ($null -ne (git status --porcelain)) {
    Write-Error "Commit or stash changes before deploying"
    exit 1
}

# 2. Clean and install dependencies
Write-Host "Cleaning and installing packages..."
Remove-Item -Path node_modules, dist, .angular -Recurse -Force -ErrorAction SilentlyContinue
npm install
if ($LASTEXITCODE -ne 0) {
    Write-Error "npm install failed"
    exit 1
}

# 3. Production build
Write-Host "Building application..."
ng build --configuration production
if ($LASTEXITCODE -ne 0) {
    Write-Error "Build failed"
    exit 1
}

# 4. Verify build output
if (-not (Test-Path "dist/dev-portfolio/index.html")) {
    Write-Error "Build output missing index.html"
    exit 1
}

# 5. Deploy to gh-pages
try {
    Write-Host "Preparing gh-pages branch..."
    
    # Switch or create gh-pages branch
    git checkout gh-pages 2>$null
    if ($LASTEXITCODE -ne 0) {
        git checkout --orphan gh-pages
        git reset --hard
        git commit --allow-empty -m "Initialize gh-pages"
    }

    # Clean and deploy
    Get-ChildItem -Path . -Exclude .git | Remove-Item -Recurse -Force
    Copy-Item -Path dist/dev-portfolio/* -Destination . -Recurse -Force

    # Commit and push
    git add -A
    git commit -m "Deploy: $(Get-Date -Format 'yyyy-MM-dd HH:mm')"
    git push origin gh-pages --force

    Write-Host "Deployment successful!" -ForegroundColor Green
}
finally {
    # Return to main branch
    git checkout main 2>$null
    Start-Process "https://piercecraft.github.io/dev-portfolio/"
}