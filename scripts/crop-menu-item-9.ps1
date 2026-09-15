Add-Type -AssemblyName System.Drawing

$sourcePath = Get-ChildItem -Path (Join-Path $PSScriptRoot '..') -Recurse -File -Filter 'menu2.jpg' |
    Select-Object -First 1 -ExpandProperty FullName
$outputPath = Join-Path $PSScriptRoot '..\assets\menu\kurczak-panierowany-menu-crop.jpg'
$source = [System.Drawing.Image]::FromFile($sourcePath)

try {
    # menu2.jpg stores a portrait pixel matrix with an EXIF clockwise-rotation
    # flag. Work in the same landscape orientation shown to the user.
    $source.RotateFlip([System.Drawing.RotateFlipType]::Rotate90FlipNone)

    # Item 9 food photograph on the oriented 2048 x 1536 Asian menu.
    $cropBounds = [System.Drawing.Rectangle]::new(850, 270, 180, 165)
    $crop = [System.Drawing.Bitmap]::new($cropBounds.Width, $cropBounds.Height)
    $crop.SetResolution(96, 96)
    $graphics = [System.Drawing.Graphics]::FromImage($crop)

    try {
        $graphics.DrawImage(
            $source,
            [System.Drawing.Rectangle]::new(0, 0, $crop.Width, $crop.Height),
            $cropBounds,
            [System.Drawing.GraphicsUnit]::Pixel
        )
    }
    finally {
        $graphics.Dispose()
    }

    $canvas = [System.Drawing.Bitmap]::new(880, 660)
    $canvas.SetResolution(96, 96)
    $canvasGraphics = [System.Drawing.Graphics]::FromImage($canvas)

    try {
        $canvasGraphics.Clear([System.Drawing.Color]::FromArgb(239, 238, 230))
        $canvasGraphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
        $canvasGraphics.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
        $canvasGraphics.DrawImage($crop, [System.Drawing.Rectangle]::new(80, 0, 720, 660))

        $jpegCodec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() |
            Where-Object MimeType -eq 'image/jpeg'
        $parameters = [System.Drawing.Imaging.EncoderParameters]::new(1)
        $parameters.Param[0] = [System.Drawing.Imaging.EncoderParameter]::new(
            [System.Drawing.Imaging.Encoder]::Quality,
            94L
        )
        $canvas.Save($outputPath, $jpegCodec, $parameters)
        $parameters.Dispose()
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
