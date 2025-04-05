<#
.SYNOPSIS
    Deploys Angular project to GitHub Pages
.DESCRIPTION
    Builds from main branch and deploys to gh-pages branch
#>

# Ensure we're on main branch
if ($(git branch --show-current) -ne "main") {
    Write-Error "Must be on main branch to deploy"
    exit 1
}

# Check for uncommitted changes
if ($null -ne (git status --porcelain)) {
    Write-Error "You have uncommitted changes. Please commit or stash them first."
    exit 1
}

# Build fresh production version
Write-Host "Building production version..."
ng build --configuration production

# Verify build succeeded
if ($null -eq (Get-Item .\dist\dev-portfolio\index.html -ErrorAction SilentlyContinue)) {
    Write-Error "Build failed - index.html not found in dist"
    exit 1
}

# Create temporary deployment directory
$tempDir = Join-Path $env:TEMP "gh-pages-deploy-$(Get-Date -Format 'yyyyMMddHHmmss')"
New-Item -ItemType Directory -Path $tempDir -Force | Out-Null

# Copy dist contents to temp directory
Copy-Item -Path .\dist\dev-portfolio\* -Destination $tempDir -Recurse -Force

# Store current branch
$currentBranch = git branch --show-current

# Switch to gh-pages branch or create if doesn't exist
try {
    git checkout gh-pages 2>&1 | Out-Null
}
catch {
    Write-Host "Creating new gh-pages branch"
    git checkout --orphan gh-pages
    git reset --hard
    git commit --allow-empty -m "Initialize gh-pages"
}

# Remove everything except .git
Get-ChildItem -Force | 
Where-Object { $_.Name -ne '.git' } | 
Remove-Item -Recurse -Force

# Copy built files from temp directory
Copy-Item -Path "$tempDir\*" -Destination . -Recurse -Force

# Commit and push to gh-pages
git add -A
git commit -m "Deploy: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')"
git push origin gh-pages --force

# Clean up
Remove-Item -Path $tempDir -Recurse -Force -ErrorAction SilentlyContinue
git checkout $currentBranch 2>&1 | Out-Null

# Verify
Start-Process "https://piercecraft.github.io/dev-portfolio/"
Write-Host "✅ Deployment complete! Changes may take 1-2 minutes to appear."