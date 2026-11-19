# Aprenem - posa un numero de versio nou als arxius d'index.html (?v=AAAAMMDDHHMM)
# perque els navegadors (i l'iPhone) carreguin els arxius nous en publicar, sense esperar la memoria cau.
# Us: powershell -ExecutionPolicy Bypass -File eines\versio.ps1   (abans de cada publicacio a main)
$root = Split-Path -Parent $PSScriptRoot
$p = Join-Path $root 'index.html'
$s = [IO.File]::ReadAllText($p, [Text.Encoding]::UTF8)
$v = Get-Date -Format 'yyyyMMddHHmm'
$s = [regex]::Replace($s, '(src|href)="((?:programa|contingut|estil)/[^"?]+)(\?v=\d+)?"', { param($m) $m.Groups[1].Value + '="' + $m.Groups[2].Value + '?v=' + $v + '"' })
[IO.File]::WriteAllText($p, $s, (New-Object Text.UTF8Encoding $false))
"OK versio $v"
