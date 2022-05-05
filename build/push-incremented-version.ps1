function Unescape($str) {
    return [Regex]::Replace($str, 
        "\\[Uu]([0-9A-Fa-f]{4})", 
        { [char]::ToString([Convert]::ToInt32($args[0].Groups[1].Value, 16)) } )
}

$package = Get-Content "version.json" | ConvertFrom-Json 
$newVersion = $package.version
git config --unset user.name
git config --unset user.email
git config --global user.email "issblder@microsoft.com"
git config --global user.name "ISS build account"
git add version.json
git add src/version.ts
git commit -m "Incrementing package version to $newVersion"
git tag $newVersion
$errorActionPreference = 'silentlycontinue'
git push origin HEAD:main
git push --tags

$manifestPath = "bundle\manifest.json"
if (Test-Path $manifestPath) {
    $manifest = Get-Content $manifestPath -Encoding utf8 | ConvertFrom-Json
    $manifest | Add-Member -NotePropertyName version -NotePropertyValue $newVersion -Force
    $manifest | ConvertTo-Json -Depth 100 | % { Unescape($_) } | Out-File $manifestPath -Encoding utf8
}
else {
    Write-Host "Didn't find manifest path"
    Write-Host Get-Location
}