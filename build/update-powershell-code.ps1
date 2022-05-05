if (Test-Path "dist\powershell-module") {
    $package = Get-Content version.json | ConvertFrom-Json 
    $file = Get-Childitem -Path dist\powershell-module\**\*.psd1
    if ($package -AND $file) {
        $replace = [string]::Format("ModuleVersion = '{0}'", $package.version)
        $find = "ModuleVersion = '0.0.0'"
        (Get-Content $file.FullName).replace($find, $replace) | Set-Content $file.FullName
    }
}
