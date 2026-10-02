# One-off generator for the Open Graph card used when the portfolio link is
# shared (LinkedIn Featured, WhatsApp, Slack, Discord...). LinkedIn needs a
# 1200x630 raster image and will not render an SVG, so this draws a PNG.
#
# Run:  pwsh -File scripts/generate-og-image.ps1
Add-Type -AssemblyName System.Drawing

$W = 1200
$H = 630
$out = Join-Path (Split-Path -Parent $PSScriptRoot) "public\og-image.png"

$bmp = New-Object System.Drawing.Bitmap($W, $H)
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$g.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic

# Diagonal brand gradient (teal -> sky -> indigo), matching the site's palette.
$rect = New-Object System.Drawing.Rectangle(0, 0, $W, $H)
$grad = New-Object System.Drawing.Drawing2D.LinearGradientBrush(
  $rect,
  [System.Drawing.Color]::FromArgb(255, 13, 148, 136),
  [System.Drawing.Color]::FromArgb(255, 37, 99, 235),
  35.0
)
$g.FillRectangle($grad, $rect)

# Soft glow behind the name.
$glow = New-Object System.Drawing.Drawing2D.LinearGradientBrush(
  (New-Object System.Drawing.Rectangle(0, 0, $W, 340)),
  [System.Drawing.Color]::FromArgb(90, 255, 255, 255),
  [System.Drawing.Color]::FromArgb(0, 255, 255, 255),
  90.0
)
$g.FillRectangle($glow, 0, 0, $W, 340)

# Bottom wave, echoing the site's hero background.
$wave = New-Object System.Drawing.Drawing2D.GraphicsPath
$wave.AddBezier(-50, 500, 260, 400, 420, 620, 640, 510)
$wave.AddBezier(760, 440, 900, 600, 1120, 470, 1260, 545)
$wave.AddLine(1260, 700)
$wave.AddLine(-50, 700)
$wave.CloseFigure()
$waveBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(45, 2, 20, 45))
$g.FillPath($waveBrush, $wave)

function New-Font([float]$size, [System.Drawing.FontStyle]$style = [System.Drawing.FontStyle]::Regular) {
  return New-Object System.Drawing.Font("Segoe UI", $size, $style, [System.Drawing.GraphicsUnit]::Pixel)
}

$white = [System.Drawing.Brushes]::White
$soft = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(235, 255, 255, 255))
$dim = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(215, 255, 255, 255))

# Greeting: plain text, no backing box (the box read as a harsh dark bar).
$g.DrawString("Hi there, I'm", (New-Font 42), $white, 72, 96)

# Name (large, bold)
$g.DrawString("Kavad Rushi", (New-Font 100 ([System.Drawing.FontStyle]::Bold)), $white, 68, 158)

# Accent underline, placed BELOW the name baseline so it never crosses the text.
$accent = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(225, 94, 234, 212))
$g.FillRectangle($accent, 74, 272, 392, 5)

# Role
$g.DrawString("MERN Stack Developer", (New-Font 52 ([System.Drawing.FontStyle]::Bold)), $soft, 72, 300)

# Tech line
$g.DrawString("React  •  Node.js  •  Express  •  MongoDB  •  MySQL", (New-Font 33), $dim, 74, 378)

# CTA pill
$pillPen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(125, 255, 255, 255), 2)
$g.DrawRectangle($pillPen, 72, 440, 470, 66)
$g.DrawString("View Portfolio  →", (New-Font 32 ([System.Drawing.FontStyle]::Bold)), $white, 96, 454)

$dir = Split-Path -Parent $out
if (-not (Test-Path $dir)) { New-Item -ItemType Directory -Path $dir -Force | Out-Null }
$bmp.Save($out, [System.Drawing.Imaging.ImageFormat]::Png)

$g.Dispose(); $bmp.Dispose(); $grad.Dispose(); $glow.Dispose()
$waveBrush.Dispose(); $wave.Dispose(); $pillPen.Dispose(); $accent.Dispose()
$soft.Dispose(); $dim.Dispose()

Write-Output "wrote $out ($((Get-Item $out).Length) bytes, ${W}x${H})"