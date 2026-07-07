@echo off
set /p ProjectName="Which project are you deploying? (e.g. ThirdNext): "

cd /d "%~dp0"

echo.
echo [1/3] Localizing images...
venv\Scripts\python.exe localize.py --source-dir "_source\%ProjectName%"

echo.
echo [2/3] Encrypting project [%ProjectName%]...
powershell -ExecutionPolicy Bypass -File "encrypt-all.ps1" -ProjectName "%ProjectName%"

echo.
echo [3/3] Pushing to GitHub...
git add .
git commit -m "Deploy update for %ProjectName%"
git push origin main

echo.
echo 🎉 Live at [https://yourusername.github.io/PROJECTS/%ProjectName%/](https://yourusername.github.io/PROJECTS/%ProjectName%/)
pause