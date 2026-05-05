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
if (-not (Test-Path $OutputPath)) { New-Item -ItemType Directory -Path $OutputPath | Out-Null }

# 4. Sync Assets (This handles the folders and images flawlessly)
Write-Host "--- Syncing Assets for $ProjectName ---"
robocopy "$SourcePath" "$OutputPath" /E /XF *.html

# 5. Encrypt (THE FIX: File-by-file explicit targeting)
Write-Host "--- Encrypting HTML Files for $ProjectName ---"
# Find every HTML file, no matter how deep it is nested
$HtmlFiles = Get-ChildItem -Path "$SourcePath" -Filter "*.html" -Recurse

foreach ($file in $HtmlFiles) {
    # Calculate exactly where this file belongs in the PROJECTS folder
    $relativePath = $file.FullName.Substring($SourcePath.Length).Trim('\')
    $destinationFile = Join-Path $OutputPath $relativePath
    $destinationDir = Split-Path $destinationFile -Parent
    
    Write-Host "Encrypting -> $relativePath"
    
    # We pass the exact file and the exact destination directory. No -r flag used.
    staticrypt $file.FullName -p "$PASS" -d "$destinationDir" --remember 0
}

Write-Host "SUCCESS: $ProjectName is ready."