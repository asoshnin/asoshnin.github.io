param([string]$ProjectName)

if (-not $ProjectName) {
    $ProjectName = Read-Host "Enter the project folder name (e.g., ThirdNext)"
}

$RootPath = (Get-Location).Path
$SourcePath = Join-Path $RootPath "_source\$ProjectName"
$OutputPath = Join-Path $RootPath "PROJECTS\$ProjectName"

if (-not (Test-Path $SourcePath)) {
    Write-Error "CRITICAL: Source folder $SourcePath not found!"
    exit
}

# 2. Load Password securely into Process scope
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

# 4. Sync Assets (Additive sync)
Write-Host "📁 Syncing Assets for $ProjectName..."
robocopy "$SourcePath" "$OutputPath" /E /XF *.html | Out-Null

# 5. Encrypt HTML Files explicitly
Write-Host "🔐 Encrypting HTML Files for $ProjectName..."
$HtmlFiles = Get-ChildItem -Path "$SourcePath" -Filter "*.html" -Recurse

foreach ($file in $HtmlFiles) {
    $relativePath = $file.FullName.Substring($SourcePath.Length).Trim('\')
    $destinationFile = Join-Path $OutputPath $relativePath
    $destinationDir = Split-Path $destinationFile -Parent
    
    Write-Host "   -> Encrypting $relativePath"
    staticrypt $file.FullName -p "$PASS" -d "$destinationDir" --remember 0
}

Write-Host "✅ SUCCESS: $ProjectName is ready."