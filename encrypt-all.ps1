param([string]$ProjectName)

if (-not $ProjectName) {
    $ProjectName = Read-Host "Enter the project folder name (e.g., ThirdNext)"
}

# 1. Establish Absolute Paths
$RootPath = (Get-Location).Path
$SourcePath = Join-Path $RootPath "_source\$ProjectName"
$OutputPath = Join-Path $RootPath "PROJECTS\$ProjectName"

if (-not (Test-Path $SourcePath)) {
    Write-Error "Source folder $SourcePath not found!"
    exit
}

# 2. Load Password
$EnvVarName = "PASS_$ProjectName"
Get-Content (Join-Path $RootPath ".env") | ForEach-Object {
    if ($_ -match "^\s*$EnvVarName=(.+)$") {
        [System.Environment]::SetEnvironmentVariable($EnvVarName, $matches[1].Trim(), "Process")
    }
}

$PASS = [System.Environment]::GetEnvironmentVariable($EnvVarName, "Process")

if (-not $PASS) {
    Write-Error "CRITICAL: No password found in .env for variable: $EnvVarName"
    exit
}

# 3. Create output directory
if (-not (Test-Path $OutputPath)) { New-Item -ItemType Directory -Path $OutputPath }

# 4. Sync Assets
Write-Host "--- Syncing Assets for $ProjectName ---"
robocopy "$SourcePath" "$OutputPath" /E /XF *.html

# 5. Encrypt (FIX APPLIED: Jump inside the folder, target "." to prevent nesting)
Write-Host "--- Encrypting $ProjectName ---"
Push-Location $SourcePath
staticrypt "." -r -p "$PASS" -d "$OutputPath" --remember 0
Pop-Location

Write-Host "SUCCESS: $ProjectName is ready."