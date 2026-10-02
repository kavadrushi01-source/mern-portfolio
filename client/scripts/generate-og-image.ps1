# One-off generator for the Open Graph cards used when links are shared
# (LinkedIn Featured, WhatsApp, Slack, Discord...).
#
# Produces two 1200x630 PNGs in client\public:
#   og-image.png   - portfolio card (teal/blue brand gradient)
#   github-og.png  - GitHub card (dark slate, teal accent)
#
# Why the GitHub card exists: GitHub sets og:image on a profile page to just
# the account avatar, so a LinkedIn Featured card aimed straight at
# github.com/<user> renders a tiny avatar (or a default placeholder). Serving
# this card from the portfolio gives a real preview; the /github page then
# redirects to the profile.
#
# Run:  pwsh -File scripts/generate-og-image.ps1
Add-Type -AssemblyName System.Drawing

# PowerShell variables are case-insensitive: never name a loop variable $w or
# it will silently clobber $W (canvas width).
$W = 1200
$H = 630

function New-Font([float]$size, [System.Drawing.FontStyle]$style = [System.Drawing.FontStyle]::Regular) {
  return New-Object System.Drawing.Font("Segoe UI", $size, $style, [System.Drawing.GraphicsUnit]::Pixel)
}

function New-Canvas {
  $bmp = New-Object System.Drawing.Bitmap($W, $H)
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
  $g.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit
  $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
  return @($bmp, $g)
}

function Save-Card($bmp, $g, [string]$name) {
  $out = Join-Path (Split-Path -Parent $PSScriptRoot) "public\$name"
  $dir = Split-Path -Parent $out
  if (-not (Test-Path $dir)) { New-Item -ItemType Directory -Path $dir -Force | Out-Null }
  $bmp.Save($out, [System.Drawing.Imaging.ImageFormat]::Png)
  Write-Output "wrote $name ($((Get-Item $out).Length) bytes, ${W}x${H})"
  $g.Dispose(); $bmp.Dispose()
}

# --- Card 1: portfolio ------------------------------------------------------
$bmp1, $g1 = New-Canvas
$grad1 = New-Object System.Drawing.Drawing2D.LinearGradientBrush(
  (New-Object System.Drawing.Rectangle(0, 0, $W, $H)),
  [System.Drawing.Color]::FromArgb(255, 13, 148, 136),
  [System.Drawing.Color]::FromArgb(255, 37, 99, 235),
  35.0
)
$g1.FillRectangle($grad1, (New-Object System.Drawing.Rectangle(0, 0, $W, $H)))

$white = [System.Drawing.Brushes]::White
$soft = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(235, 255, 255, 255))
$dim = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(215, 255, 255, 255))
$accent = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(225, 94, 234, 212))

$g1.DrawString("Hi there, I'm", (New-Font 42), $white, 72, 96)
$g1.DrawString("Kavad Rushi", (New-Font 100 ([System.Drawing.FontStyle]::Bold)), $white, 68, 158)
$g1.FillRectangle($accent, 74, 272, 392, 5)
$g1.DrawString("MERN Stack Developer", (New-Font 52 ([System.Drawing.FontStyle]::Bold)), $soft, 72, 300)
$g1.DrawString("React  |  Node.js  |  Express  |  MongoDB  |  MySQL", (New-Font 33), $dim, 74, 378)

$pillPen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(125, 255, 255, 255), 2)
$g1.DrawRectangle($pillPen, 72, 440, 470, 66)
$g1.DrawString("View Portfolio", (New-Font 32 ([System.Drawing.FontStyle]::Bold)), $white, 96, 454)

Save-Card $bmp1 $g1 "og-image.png"
$grad1.Dispose(); $pillPen.Dispose(); $soft.Dispose(); $dim.Dispose(); $accent.Dispose()
# --- Card 2: GitHub ---------------------------------------------------------
$bmp2, $g2 = New-Canvas
$grad2 = New-Object System.Drawing.Drawing2D.LinearGradientBrush(
  (New-Object System.Drawing.Rectangle(0, 0, $W, $H)),
  [System.Drawing.Color]::FromArgb(255, 13, 17, 23),
  [System.Drawing.Color]::FromArgb(255, 22, 27, 34),
  45.0
)
$g2.FillRectangle($grad2, (New-Object System.Drawing.Rectangle(0, 0, $W, $H)))

$glow2 = New-Object System.Drawing.Drawing2D.LinearGradientBrush(
  (New-Object System.Drawing.Rectangle(0, 0, $W, 420)),
  [System.Drawing.Color]::FromArgb(70, 45, 212, 191),
  [System.Drawing.Color]::FromArgb(0, 45, 212, 191),
  90.0
)
$g2.FillRectangle($glow2, (New-Object System.Drawing.Rectangle(0, 0, $W, 420)))

$white2 = [System.Drawing.Brushes]::White
$soft2 = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(235, 255, 255, 255))
$dim2 = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(190, 255, 255, 255))
$accent2 = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(230, 45, 212, 191))

# GitHub mark: white rounded square with a "GH" monogram.
$mx = 72.0; $my = 74.0; $md = 96.0; $mr = 22.0
$markPath = New-Object System.Drawing.Drawing2D.GraphicsPath
$markPath.AddArc($mx, $my, $mr * 2, $mr * 2, 180, 90)
$markPath.AddArc($mx + $md - $mr * 2, $my, $mr * 2, $mr * 2, 270, 90)
$markPath.AddArc($mx + $md - $mr * 2, $my + $md - $mr * 2, $mr * 2, $mr * 2, 0, 90)
$markPath.AddArc($mx, $my + $md - $mr * 2, $mr * 2, $mr * 2, 90, 90)
$markPath.CloseFigure()
$markBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 255, 255, 255))
$g2.FillPath($markBrush, $markPath)
$markInk = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 13, 17, 23))
$ghFont = New-Font 42 ([System.Drawing.FontStyle]::Bold)
$ghSize = $g2.MeasureString("GH", $ghFont)
$g2.DrawString("GH", $ghFont, $markInk, [single]($mx + ($md - $ghSize.Width) / 2), [single]($my + ($md - $ghSize.Height) / 2))

$g2.DrawString("GitHub", (New-Font 38 ([System.Drawing.FontStyle]::Bold)), $dim2, 204, 84)
$g2.DrawString("kavadrushi01-source", (New-Font 68 ([System.Drawing.FontStyle]::Bold)), $white2, 202, 124)
$g2.FillRectangle($accent2, 74, 220, 300, 5)
$g2.DrawString("MERN Stack Developer", (New-Font 46 ([System.Drawing.FontStyle]::Bold)), $soft2, 72, 254)
$g2.DrawString("Open-source projects, full-stack apps and experiments.", (New-Font 31), $dim2, 74, 320)

# Repo chips
$chipFont = New-Font 26
$chipPen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(110, 255, 255, 255), 2)
$chipX = 74.0
foreach ($chip in @("mern-portfolio", "foodhub", "wanderlust")) {
  $size = $g2.MeasureString($chip, $chipFont)
  $chipW = [single]($size.Width + 52)
  $g2.DrawRectangle($chipPen, [single]$chipX, 398, $chipW, 56)
  $g2.DrawString($chip, $chipFont, $soft2, [single]($chipX + 26), 411)
  $chipX += $chipW + 18
}

$g2.DrawString("github.com/kavadrushi01-source", (New-Font 32 ([System.Drawing.FontStyle]::Bold)), $accent2, 74, 510)

Save-Card $bmp2 $g2 "github-og.png"
$grad2.Dispose(); $glow2.Dispose(); $markPath.Dispose(); $markBrush.Dispose(); $markInk.Dispose()
$ghFont.Dispose(); $chipPen.Dispose(); $chipFont.Dispose()
$soft2.Dispose(); $dim2.Dispose(); $accent2.Dispose()