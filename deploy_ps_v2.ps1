$ProjectName = Read-Host 'Which project are you deploying? (e.g. ThirdNext)'

Set-Location $PSScriptRoot

Write-Host ''
Write-Host '[1/3] Localizing images...'
& .\venv\Scripts\python.exe .\localize.py --source-dir "_source\$ProjectName"

Write-Host ''
Write-Host "[2/3] Encrypting project [$ProjectName]..."
& powershell -ExecutionPolicy Bypass -File .\encrypt-all.ps1 -ProjectName $ProjectName

Write-Host ''
Write-Host '[3/3] Pushing to GitHub...'
git add .
git commit -m "Deploy update for $ProjectName"
git push origin main

Write-Host ''
Write-Host "🎉 Live at https://yourusername.github.io/PROJECTS/$ProjectName/"
Read-Host 'Press Enter to exit'