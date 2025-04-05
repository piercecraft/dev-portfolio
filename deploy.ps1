<#
.SYNOPSIS
    Safely deploys Angular project to GitHub Pages
.DESCRIPTION
    Builds from main branch and deploys only necessary files to gh-pages
    without including cache files or exceeding size limits
#>

# 1. Pre-deployment checks
if ((git branch --show-current) -ne "main") {
    Write-Error "❌ Must be on main branch to deploy"
    exit 1
}

if ($null -ne (git status --porcelain)) {
    Write-Error "❌ Uncommitted changes detected. Commit or stash them first."
    exit 1
}

# 2. Clean build environment
Write-Host "🧹 Cleaning build artifacts..."
Remove-Item -Path .\dist, .\.angular -Recurse -Force -ErrorAction SilentlyContinue

# 3. Production build
Write-Host "🔨 Building production version..."
ng build --configuration production --no-cache

# 4. Verify build
if (-not (Test-Path ".\dist\dev-portfolio\index.html")) {
    Write-Error "❌ Build failed - index.html not found"
    exit 1
}

# 5. Prepare deployment package
$tempDir = Join-Path $env:TEMP "gh-pages-deploy-$(Get-Date -Format 'yyyyMMddHHmmss')"
New-Item -ItemType Directory -Path $tempDir -Force | Out-Null

Get-ChildItem -Path ".\dist\dev-portfolio" -Exclude '.*' | 
Copy-Item -Destination $tempDir -Recurse -Force

# 6. Deploy to gh-pages
try {
    # Switch to gh-pages branch
    $branchCheck = git checkout gh-pages 2>&1
    if ($LASTEXITCODE -ne 0) {
        Write-Host "🆕 Creating new gh-pages branch"
        git checkout --orphan gh-pages
        git reset --hard
        git commit --allow-empty -m "Initialize gh-pages branch"
    }

    # Clean branch and deploy
    Get-ChildItem -Path . -Exclude '.git' | Remove-Item -Recurse -Force
    Copy-Item -Path "$tempDir\*" -Destination . -Recurse -Force

    # Commit and push
    git add -A
    git commit -m "Deploy: $(Get-Date -Format 'yyyy-MM-dd HH:mm') [skip ci]"
    git push origin gh-pages --force

    Write-Host "✅ Deployment successful!" -ForegroundColor Green
}
catch {
    Write-Error "❌ Deployment failed: $_"
    exit 1
}
finally {
    # Cleanup
    Remove-Item -Path $tempDir -Recurse -Force -ErrorAction SilentlyContinue
    git checkout main 2>$null
}

# 7. Verify
Start-Sleep -Seconds 5
Start-Process "https://piercecraft.github.io/dev-portfolio/"