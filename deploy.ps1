<#
.SYNOPSIS
    Angular GitHub Pages Deployment without Cache Issues
.DESCRIPTION
    Deploys Angular app to gh-pages while avoiding cache file problems
#>

# 1. Environment validation
Write-Host "=== Validating Environment ==="
if ((git branch --show-current) -ne "main") {
    Write-Error "Must be on main branch to deploy"
    exit 1
}

if ($null -ne (git status --porcelain)) {
    Write-Error "Commit or stash changes before deploying"
    exit 1
}

# 2. Clean install
Write-Host "=== Cleaning and Installing ==="
Remove-Item -Path node_modules, dist -Recurse -Force -ErrorAction SilentlyContinue
npm ci
if ($LASTEXITCODE -ne 0) {
    Write-Error "npm install failed"
    exit 1
}

# 3. Production build with no cache
Write-Host "=== Building Production ==="
$env:NG_BUILD_CACHE = 0
ng build --configuration production --no-cache
if ($LASTEXITCODE -ne 0) {
    Write-Error "Build failed"
    exit 1
}

# 4. Verify build output
if (-not (Test-Path "dist/dev-portfolio/index.html")) {
    Write-Error "Build output missing index.html"
    exit 1
}

# 5. Prepare deployment in temp directory
Write-Host "=== Preparing Deployment ==="
$tempDir = "$env:TEMP/gh-pages-$(Get-Date -Format 'yyyyMMddHHmmss')"
New-Item -ItemType Directory -Path $tempDir | Out-Null

# Copy only the built files (exclude hidden directories)
Copy-Item -Path "dist/dev-portfolio/*" -Destination $tempDir -Recurse -Force

# 6. Deploy to gh-pages
try {
    Write-Host "=== Deploying to gh-pages ==="
    
    # Switch or create gh-pages branch
    git checkout gh-pages 2>$null
    if ($LASTEXITCODE -ne 0) {
        git checkout --orphan gh-pages
        git reset --hard
        git commit --allow-empty -m "Initialize gh-pages"
    }

    # Clean branch completely (keep .git)
    Get-ChildItem -Path . -Exclude '.git' | Remove-Item -Recurse -Force

    # Copy only the built files
    Copy-Item -Path "$tempDir/*" -Destination . -Recurse -Force

    # Commit and push
    git add -A
    git commit -m "Deploy: $(Get-Date -Format 'yyyy-MM-dd HH:mm')"
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
    Write-Host "=== Cleanup Complete ==="
}

# 7. Verify
Start-Sleep -Seconds 2
Start-Process "https://piercecraft.github.io/dev-portfolio/"