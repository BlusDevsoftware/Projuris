Add-Type -AssemblyName System.Drawing
$svgPath = "default-avatar.svg"
$pngPath = "default-avatar.png"

# Carregar o SVG
$svgContent = Get-Content $svgPath -Raw

# Criar um bitmap
$bitmap = New-Object System.Drawing.Bitmap 200, 200
$graphics = [System.Drawing.Graphics]::FromImage($bitmap)
$graphics.Clear([System.Drawing.Color]::White)

# Desenhar o SVG
$graphics.DrawString($svgContent, [System.Drawing.Font]::new("Arial", 12), [System.Drawing.Brushes]::Black, 0, 0)

# Salvar como PNG
$bitmap.Save($pngPath, [System.Drawing.Imaging.ImageFormat]::Png)

# Limpar recursos
$graphics.Dispose()
$bitmap.Dispose() 