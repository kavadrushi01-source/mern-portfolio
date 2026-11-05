# Quick self-check for the ATS-friendliness of the resume. Run after editing
# either resume file:  pwsh -File scripts/check-resume-ats.ps1
$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $PSScriptRoot
$html = Get-Content (Join-Path $root "public\resume.html") -Raw
$jsx = Get-Content (Join-Path $root "src\components\Resume.jsx") -Raw
$fallback = Get-Content (Join-Path $root "src\data\fallback.js") -Raw
$resumeProjects = Get-Content (Join-Path $root "src\data\resumeProjects.js") -Raw
$projectUi = Get-Content (Join-Path $root "src\components\Projects.jsx") -Raw
$serverProjects = Get-Content (Join-Path $root "..\server\src\data\projects.js") -Raw
$pass = 0; $fail = 0
function Check($name, $ok) {
  if ($ok) { $script:pass++; Write-Output ("  PASS  {0}" -f $name) }
  else { $script:fail++; Write-Output ("  FAIL  {0}" -f $name) }
}

Write-Output "resume.html"
Check "JSON-LD structured data"        $html.Contains("application/ld+json")
Check "A4 @page rule for print"        $html.Contains("@page")
Check "no dark gradient header"        (-not $html.Contains("linear-gradient(120deg"))
Check "no plain-text button"          (-not $html.Contains("downloadTxt"))
Check "no Additional Projects"        (-not $html.Contains("Additional Projects"))
Check "labelled contact fields"        $html.Contains("<strong>Email:</strong>") -and $html.Contains("<strong>Portfolio:</strong>")
Check "LinkedIn removed from HTML"     (-not $html.Contains("linkedin.com/in/kavad-rushi-b24484411"))
Check "Portfolio link in HTML"         $html.Contains("mern-portfolio-client-three.vercel.app")
Check "Next.js skill in HTML"          $html.Contains("Next.js")
Check "black and gray print colors"   $html.Contains("--accent: #111") -and $html.Contains("--muted: #666")
Check "FoodHub demo logins in HTML"   $html.Contains("admin@foodhub.com / Admin@123") -and $html.Contains("user@foodhub.com / User@123") -and $html.Contains("delivery@foodhub.com / Delivery@123")
 $foodHubHtml = $html.Substring($html.IndexOf("FoodHub -"))
Check "FoodHub tech listed first"     ($foodHubHtml.IndexOf("class=""tech""") -lt $foodHubHtml.IndexOf("A food-ordering platform"))
Check "Project Features headings"     ([regex]::Matches($html, "Project Features").Count -eq 2) -and $projectUi.Contains("<h4>Project Features</h4>")
Check "Studyfy AI and messaging in HTML" $html.Contains("AI generates report-card remarks") -and $html.Contains("Socket.io powers parent-teacher messages")
Check "final GitHub and portfolio info line" $html.Contains("For more info on these projects, visit") -and $html.Contains("https://github.com/kavadrushi01-source</a>") -and $html.Contains("https://mern-portfolio-client-three.vercel.app/#projects")
Check "responsive resume layout"      $html.Contains("@media screen and (max-width: 600px)") -and $html.Contains("overflow-wrap: anywhere")
Check "no arrow glyph"                 (-not $html.Contains([string][char]0x2197))
Check "no emoji"                       (([regex]::Matches($html, "[\uD800-\uDBFF][\uDC00-\uDFFF]")).Count -eq 0)
Check "print break-inside rules"       $html.Contains("break-inside: avoid")

Write-Output "`nStandard ATS section headings (resume.html)"
$expected = @("Technical Skills", "Projects", "Education")
$found = [regex]::Matches($html, "<h2>([^<]+)</h2>") | ForEach-Object { $_.Groups[1].Value }
foreach ($e in $expected) { Check "section '$e'" ($found -contains $e) }

Write-Output "`nResume.jsx (generated PDF)"
Check "no filled dark header band"     (-not $jsx.Contains('doc.rect(0, 0, W, 110, "F")'))
Check "no Professional Summary"        (-not $jsx.Contains('section("Professional Summary")'))
Check "standard 'Technical Skills'"    $jsx.Contains('section("Technical Skills")')
Check "labelled clickable contact"      $jsx.Contains('label: "Email"')
Check "categorised skill groups"        $jsx.Contains("SKILL_GROUPS")
Check "simplified skills"              $jsx.Contains('"Frontend", "React.js, JavaScript, HTML5, CSS3, Tailwind CSS, Next.js"')
Check "ASCII bullet (no glyph)"        $jsx.Contains('`-  ${ascii(h)}`') -and (-not $jsx.Contains([string][char]0x2022))
Check "LinkedIn removed from PDF"      (-not $jsx.Contains("linkedin.com/in/kavad-rushi-b24484411"))
Check "Portfolio link in PDF"          $jsx.Contains("mern-portfolio-client-three.vercel.app")
Check "contact in 2-col grid"          $jsx.Contains("COL_W")
Check "no running x for contacts"      (-not $jsx.Contains("let cx = M;"))
Check "Projects before Education"      ($jsx.IndexOf('section("Projects")') -lt $jsx.IndexOf('section("Education")'))
Check "coursework line"                $jsx.Contains("Relevant Coursework")
Check "PDF metadata keywords"          $jsx.Contains("setProperties")
Check "core PDF fonts only"             $jsx.Contains('doc.setFont("helvetica"')
Check "clickable project GitHub/portfolio links" $jsx.Contains('doc.link(githubStart') -and $jsx.Contains("url: PORTFOLIO_URL")
Check "single-page PDF enforced"       $jsx.Contains("Resume content exceeds one A4 page.") -and (-not $jsx.Contains("doc.addPage()"))
$pdfColors = [regex]::Matches($jsx, 'doc\.setTextColor\((\d+),\s*(\d+),\s*(\d+)\)')
$grayOnly = $pdfColors.Count -gt 0
foreach ($color in $pdfColors) {
  if (($color.Groups[1].Value -ne $color.Groups[2].Value) -or ($color.Groups[2].Value -ne $color.Groups[3].Value)) {
    $grayOnly = $false
  }
}
Check "black and gray PDF palette"     ($grayOnly -and $jsx.Contains("doc.setTextColor(0, 0, 0)"))
Check "FoodHub demo logins in PDF"     $resumeProjects.Contains("admin@foodhub.com / Admin@123") -and $resumeProjects.Contains("user@foodhub.com / User@123") -and $resumeProjects.Contains("delivery@foodhub.com / Delivery@123")
Check "FoodHub integrations in PDF"    $resumeProjects.Contains("Foodie answers") -and $resumeProjects.Contains("simulated payment OTP") -and $resumeProjects.Contains("OpenStreetMap")
Check "Studyfy AI and messaging in PDF" $resumeProjects.Contains("AI generates report-card remarks") -and $resumeProjects.Contains("attendance-anomaly insights") -and $resumeProjects.Contains("Socket.io")
Check "six core Studyfy roles clear"   $resumeProjects.Contains("six core school roles") -and $resumeProjects.Contains("Platform Owner and Librarian")
Check "final GitHub and portfolio info line in PDF" $jsx.Contains("For more info on these projects, visit GitHub or Portfolio.")
Check "PDF selects FoodHub and Studyfy" $resumeProjects.Contains('RESUME_PROJECT_ORDER = ["FoodHub", "Studyfy"]')
Check "Studyfy live URL in data"       $fallback.Contains("studyfy-web.vercel.app")
Check "Studyfy in HTML resume"         $html.Contains("Studyfy - Multi-tenant School Management")
Check "Wanderlust removed from HTML"   (-not $html.Contains("Wanderlust"))
Check "Wanderlust removed from PDF"    (-not $jsx.Contains("Wanderlust"))
Check "portfolio project copy synced"  $fallback.Contains("100+ intents") -and $serverProjects.Contains("100+ hand-written intents") -and $projectUi.Contains("Tech Stack")

Write-Output ("`n{0} passed, {1} failed" -f $pass, $fail)
if ($fail -gt 0) { exit 1 }
