# Packs the build of dist/ (npm run build) into release/Epreuves.exe, a single Windows executable
# (see Epreuves.cs). Compiled with the C# compiler of the .NET Framework that comes with Windows.
param(
  [string]$Dist = "$PSScriptRoot\..\dist",
  [string]$Out = "$PSScriptRoot\..\release\Epreuves.exe"
)
$ErrorActionPreference = 'Stop'

if (-not (Test-Path "$Dist\index.html")) { throw "Aucun build dans $Dist : lancez d'abord npm run build." }
$Out = [IO.Path]::GetFullPath($Out)
$obj = Join-Path (Split-Path $Out) 'obj'
New-Item -ItemType Directory -Force $obj | Out-Null

$zip = "$obj\site.zip"
Remove-Item $zip -ErrorAction SilentlyContinue
Add-Type -AssemblyName System.IO.Compression.FileSystem
[IO.Compression.ZipFile]::CreateFromDirectory((Resolve-Path $Dist), $zip)

$version = (Get-Content "$PSScriptRoot\..\package.json" -Raw | ConvertFrom-Json).version
"[assembly: System.Reflection.AssemblyVersion(`"$version`")]" | Set-Content "$obj\Version.cs"

& "$env:WINDIR\Microsoft.NET\Framework64\v4.0.30319\csc.exe" /nologo /target:winexe /optimize+ /codepage:65001 `
  "/out:$Out" "/win32icon:$PSScriptRoot\app.ico" "/resource:$zip,site.zip" `
  /r:System.IO.Compression.dll /r:System.Drawing.dll /r:System.Windows.Forms.dll `
  "$PSScriptRoot\Epreuves.cs" "$obj\Version.cs"
if ($LASTEXITCODE) { throw "La compilation a échoué." }
Write-Host "  $Out ($([math]::Round((Get-Item $Out).Length / 1MB, 1)) Mo)"
