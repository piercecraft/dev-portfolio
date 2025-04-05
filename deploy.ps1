<#
.SYNOPSIS
    Angular to GitHub Pages Deployment
.DESCRIPTION
    Minimal deployment script without temp files or unused variables
#>

# 1. Environment validation
if ((git branch --show-current) -ne "main") {
    Write-Error "Must be on main branch to deploy"
    exit 1
}

if ($null -ne (git status --porcelain)) {
    Write-Error "Uncommitted changes detected"
    exit 1
}

# 2. Clean production build
Write-Host "Building production version..."
Remove-Item -Path dist, .angular -Recurse -Force -ErrorAction SilentlyContinue
ng build --configuration production --no-cache

if (-not (Test-Path "dist/dev-portfolio/index.html")) {
    Write-Error "Build failed - index.html not found"
    exit 1
}

# 3. Deployment
try {
    # Switch to gh-pages branch
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