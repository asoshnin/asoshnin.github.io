# Auto-activate venv if it's not already active
if ($env:VIRTUAL_ENV -eq $null) {
    Write-Host "--- Activating Environment ---" -ForegroundColor Yellow
    .\venv\Scripts\Activate.ps1
}

# 0. Run the Image Localizer
Write-Host "--- Localizing Images ---" -ForegroundColor Cyan
python localize.py

# 1. Run the Image Localizer first
Write-Host "--- Localizing Images ---" -ForegroundColor Cyan
python localize.py

# 2. Add all changes to Git
Write-Host "--- Staging changes ---" -ForegroundColor Cyan
git add .

# 3. Ask for a commit message (or use a default)
$msg = Read-Host "Enter a commit message (or press Enter for 'Auto-update')"
if ($msg -eq "") { $msg = "Auto-update: $(Get-Date -Format 'yyyy-MM-dd HH:mm')" }

# 4. Commit
Write-Host "--- Committing ---" -ForegroundColor Cyan
git commit -m "$msg"

# 5. Push to GitHub
Write-Host "--- Pushing to GitHub ---" -ForegroundColor Cyan
git push origin main

Write-Host "--- Done! Your site will be live in 1-2 minutes. ---" -ForegroundColor Green