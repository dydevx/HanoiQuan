Add-Type -AssemblyName System.Drawing

$sourcePath = Get-ChildItem -Path (Join-Path $PSScriptRoot '..') -Recurse -File -Filter 'Menu.jpg' |
    Where-Object { $_.Directory.Name -ne 'menu' } |
    Select-Object -First 1 -ExpandProperty FullName
$outputPath = Join-Path $PSScriptRoot '..\assets\menu\s36-menu-crop.jpg'
$source = [System.Drawing.Image]::FromFile($sourcePath)

try {
    # S36 food photo on the 2048 x 1536 sushi menu. Keep only the original
    # photographed plate; the surrounding copy belongs to the printed menu.
    $cropBounds = [System.Drawing.Rectangle]::new(845, 542, 350, 158)
    $crop = [System.Drawing.Bitmap]::new($cropBounds.Width, $cropBounds.Height)
    $crop.SetResolution(96, 96)
    $cropGraphics = [System.Drawing.Graphics]::FromImage($crop)

    try {
        $cropGraphics.DrawImage(
            $source,
            [System.Drawing.Rectangle]::new(0, 0, $crop.Width, $crop.Height),
            $cropBounds,
            [System.Drawing.GraphicsUnit]::Pixel
        )
    }
    finally {
        $cropGraphics.Dispose()
    }

    # The menu card uses a 4:3 frame. Pad with the menu's neutral paper tone
    # so the browser does not crop either side of the platter.
    $canvas = [System.Drawing.Bitmap]::new(700, 525)
    $canvas.SetResolution(96, 96)
    $canvasGraphics = [System.Drawing.Graphics]::FromImage($canvas)

    try {
        $canvasGraphics.Clear([System.Drawing.Color]::FromArgb(240, 239, 230))
        $canvasGraphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
        $canvasGraphics.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
        $canvasGraphics.DrawImage($crop, [System.Drawing.Rectangle]::new(0, 104, 700, 316))

        $jpegCodec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() |
            Where-Object MimeType -eq 'image/jpeg'
        $qualityEncoder = [System.Drawing.Imaging.Encoder]::Quality
        $encoderParameters = [System.Drawing.Imaging.EncoderParameters]::new(1)
        $encoderParameters.Param[0] = [System.Drawing.Imaging.EncoderParameter]::new($qualityEncoder, 94L)
        $canvas.Save($outputPath, $jpegCodec, $encoderParameters)
        $encoderParameters.Dispose()
    }
    finally {
        $canvasGraphics.Dispose()
        $canvas.Dispose()
        $crop.Dispose()
    }
}
finally {
    $source.Dispose()
}
