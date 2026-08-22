param(
  [string]$Repo = "."
)

$ErrorActionPreference = "Stop"
$PacketRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
$Patch = Join-Path $PacketRoot "patches\001_emergency_creator.patch"

Push-Location $Repo
try {
  if (-not (Test-Path ".git")) {
    throw "Run this packet against the Brambleheart repository root (or pass -Repo <path>)."
  }

  Write-Host "Checking Brambleheart Beta 0.08 emergency packet..."
  git apply --check --whitespace=nowarn $Patch
  if ($LASTEXITCODE -ne 0) {
    throw "Packet check failed. No files were changed."
  }

  Write-Host "Applying packet..."
  git apply --whitespace=nowarn $Patch
  if ($LASTEXITCODE -ne 0) {
    throw "Packet apply failed."
  }

  Write-Host "Applied successfully."
  Write-Host "Modified: src/views/CreateCharacterView.vue"
  Write-Host "Modified: src/styles.css"
}
finally {
  Pop-Location
}
