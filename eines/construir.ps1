# Aprenem - construeix les versions d'un sol arxiu a partir d'index.html + estil/ + programa/ + contingut/
#   publica\aprenem.html            -> per publicar a Claude (sense IA: Claude no deixa connectar amb Google)
#   versions\aprenem-AAAAMMDD-HHMM.html -> copia completa d'aquest moment (historial manual)
# Us:  powershell -ExecutionPolicy Bypass -File eines\construir.ps1
# (Nomes caracters ASCII en aquest script: PowerShell 5.1 llegeix els .ps1 sense BOM com a ANSI.)
$root = Split-Path -Parent $PSScriptRoot
$utf8 = New-Object Text.UTF8Encoding $false
function Read-Text($rel) { [IO.File]::ReadAllText((Join-Path $root $rel), [Text.Encoding]::UTF8) }
$s = Read-Text 'index.html'
$s = [regex]::Replace($s, '<link rel="stylesheet" href="([^"]+)">', { param($m) "<style>`n" + (Read-Text $m.Groups[1].Value) + "</style>" })
$s = [regex]::Replace($s, '<script src="([^"]+)"></script>', { param($m) "<script>`n" + (Read-Text $m.Groups[1].Value) + "</script>" })
New-Item -ItemType Directory -Force (Join-Path $root 'versions') | Out-Null
$stamp = Get-Date -Format 'yyyyMMdd-HHmm'
[IO.File]::WriteAllText((Join-Path $root "versions\aprenem-$stamp.html"), $s, $utf8)
# Versio per a Claude: sense l'esquelet HTML (Claude l'afegeix), sense boto d'imprimir i marcada com a web
$w = $s -replace '(?s)^\s*<!doctype html>\s*<html[^>]*>\s*<head>\s*', ''
$w = $w -replace '<meta charset="utf-8">\s*', ''
$w = $w -replace '<meta name="viewport"[^>]*>\s*', ''
$w = $w -replace '(?s)</head>\s*<body>', ''
$w = $w -replace '(?s)</body>\s*</html>\s*$', ''
$w = $w -replace '<button class="ghost" onclick="window.print\(\)">[^<]*</button>', ''
$w = $w -replace '<title>[^<]*</title>', "<title>Aprenem v2</title>`n<script>window.APRENEM_WEB=true</script>"
$w = $w -replace ':root\{--bg:', ':root{color-scheme:light;--bg:'
New-Item -ItemType Directory -Force (Join-Path $root 'publica') | Out-Null
[IO.File]::WriteAllText((Join-Path $root 'publica\aprenem.html'), $w, $utf8)
"OK  versions\aprenem-$stamp.html (" + $s.Length + ")  publica\aprenem.html (" + $w.Length + ")"
