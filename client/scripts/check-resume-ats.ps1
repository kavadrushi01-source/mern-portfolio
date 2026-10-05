# Quick self-check for the ATS-friendliness of the resume. Run after editing
# either resume file:  pwsh -File scripts/check-resume-ats.ps1
$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $PSScriptRoot
$html = Get-Content (Join-Path $root "public\resume.html") -Raw
$jsx = Get-Content (Join-Path $root "src\components\Resume.jsx") -Raw
$pass = 0; $fail = 0
function Check($name, $ok) {
  if ($ok) { $script:pass++; Write-Output ("  PASS  {0}" -f $name) }
  else { $script:fail++; Write-Output ("  FAIL  {0}" -f $name) }
}

Write-Output "resume.html"
Check "JSON-LD structured data"        $html.Contains("application/ld+json")
Check "A4 @page rule for print"        $html.Contains("@page")
Check "plain-text (.txt) export"       $html.Contains("function downloadTxt")
Check "no dark gradient header"        (-not $html.Contains("linear-gradient(120deg"))
Check "labelled contact fields"        $html.Contains("<strong>Email:</strong>")
Check "no arrow glyph"                 (-not $html.Contains([string][char]0x2197))
Check "no emoji"                       (([regex]::Matches($html, "[\uD800-\uDBFF][\uDC00-\uDFFF]")).Count -eq 0)
Check "print break-inside rules"       $html.Contains("break-inside: avoid")

Write-Output "`nStandard ATS section headings (resume.html)"
$expected = @("Professional Summary", "Technical Skills", "Projects", "Education")
$found = [regex]::Matches($html, "<h2>([^<]+)</h2>") | ForEach-Object { $_.Groups[1].Value }
foreach ($e in $expected) { Check "section '$e'" ($found -contains $e) }

Write-Output "`nResume.jsx (generated PDF)"
Check "no filled dark header band"     (-not $jsx.Contains('doc.rect(0, 0, W, 110, "F")'))
Check "standard 'Professional Summary'" $jsx.Contains('section("Professional Summary")')
Check "standard 'Technical Skills'"     $jsx.Contains('section("Technical Skills")')
Check "labelled clickable contact"      $jsx.Contains('label: "Email"')
Check "categorised skill groups"        $jsx.Contains("SKILL_GROUPS")
Check "ASCII bullet (no glyph)"        $jsx.Contains('`-  ${h}`') -and (-not $jsx.Contains([string][char]0x2022))
Check "PDF metadata keywords"          $jsx.Contains("setProperties")
Check "core PDF fonts only"             $jsx.Contains('doc.setFont("helvetica"')
Check "clickable project links"        $jsx.Contains("[p.live, p.github]")

Write-Output ("`n{0} passed, {1} failed" -f $pass, $fail)
if ($fail -gt 0) { exit 1 }
