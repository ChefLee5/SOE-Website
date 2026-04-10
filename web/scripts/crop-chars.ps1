Add-Type -AssemblyName System.Drawing

$chars = @("KENJI","AMARA","SILAS","ATHENA","AIKO","ELIAS","EZRA","FELIX","KWAME","NERISSA","OCTAVIA","RONAN","SELENE","VESTA")
$srcDir = "C:\Users\ldmur\Downloads\The Sound of Essentials Image Assets"
$destDir = "c:\Users\ldmur\Downloads\The Sound of Essentials_ The Rhythm Quest\web\public\assets\characters"

foreach ($c in $chars) {
    $src = "$srcDir\$c.png"
    $dst = "$destDir\${c}_crop.png"
    
    $img = [System.Drawing.Image]::FromFile($src)
    $w = $img.Width
    $h = $img.Height
    
    # Character is centered in wide landscape - take center 50% width, full height
    $cropW = [int]($w * 0.50)
    $cropX = [int](($w - $cropW) / 2)
    $cropRect = [System.Drawing.Rectangle]::new($cropX, 0, $cropW, $h)
    
    $cropped = $img.Clone($cropRect, $img.PixelFormat)
    $cropped.Save($dst, [System.Drawing.Imaging.ImageFormat]::Png)
    
    $img.Dispose()
    $cropped.Dispose()
    
    Write-Host "Cropped $c -> ${c}_crop.png"
}

Write-Host "Done!"
