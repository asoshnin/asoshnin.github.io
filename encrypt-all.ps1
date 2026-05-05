# 1. Load .env with Process-only scope (Security Fix)
Get-Content .env | ForEach-Object {
    if ($_ -match '^\s*([^#][^=]+)=(.+)$') {
        $key = $matches[1].Trim()
        $val = $matches[2].Trim()
        [System.Environment]::SetEnvironmentVariable($key, $val, [System.EnvironmentVariableTarget]::Process)
    }
}

$PASS = [System.Environment]::GetEnvironmentVariable("THIRDNEXT_PASSWORD", "Process")

if (-not $PASS) {
    Write-Error "CRITICAL: THIRDNEXT_PASSWORD not found in .env file."
    exit
}

# 2. Sync assets (Safe sync: /E copies subdirs but does NOT delete files in destination)
Write-Host "--- Syncing Assets ---"
robocopy "_source\ThirdNext" "PROJECTS\ThirdNext" /E /XF *.html

# 3. Encrypt
Write-Host "--- Running Encryption ---"
# Note: We use -p directly with the variable. 
# --remember 0 ensures the browser doesn't save the password forever.
staticrypt "_source\ThirdNext\index.html" `
    -p "$PASS" `
    -d "PROJECTS\ThirdNext" `
    --remember 0

Write-Host "DONE: Encryption complete. Files moved to PROJECTS\ThirdNext"