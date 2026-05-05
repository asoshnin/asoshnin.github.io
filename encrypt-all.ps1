param([string]$ProjectName)

# 1. Prompt for project name if not provided
if (-not $ProjectName) {
    $ProjectName = Read-Host "Enter the project folder name (e.g., ThirdNext)"
}

$SourcePath = "_source\$ProjectName"
$OutputPath = "PROJECTS\$ProjectName"

if (-not (Test-Path $SourcePath)) {
    Write-Error "Source folder $SourcePath not found!"
    exit
}

# 2. Load .env and find the specific password for this project
$EnvVarName = "PASS_$ProjectName"
Get-Content .env | ForEach-Object {
    if ($_ -match "^\s*$EnvVarName=(.+)$") {
        [System.Environment]::SetEnvironmentVariable($EnvVarName, $matches[1].Trim(), "Process")
    }
}

$PASS = [System.Environment]::GetEnvironmentVariable($EnvVarName, "Process")

if (-not $PASS) {
    Write-Error "CRITICAL: No password found in .env for variable: $EnvVarName"
    exit
}

# 3. Create output directory if it doesn't exist
if (-not (Test-Path $OutputPath)) { New-Item -ItemType Directory -Path $OutputPath }

# 4. Sync assets (Safe sync)
Write-Host "--- Syncing Assets for $ProjectName ---"
robocopy "$SourcePath" "$OutputPath" /E /XF *.html

# 5. Encrypt (Handles all HTML files in the folder)
Write-Host "--- Encrypting $ProjectName ---"
staticrypt "$SourcePath\*.html" -r `
    -p "$PASS" `
    -d "$OutputPath" `
    --remember 0

Write-Host "SUCCESS: $ProjectName is ready."