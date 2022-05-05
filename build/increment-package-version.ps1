#Use this to unescape the unicode literals in JSON strings
$package = Get-Content version.json | ConvertFrom-Json 

$versions = $package.version.Split('.')
$minorVersion = [int]::Parse($versions[1])
$minorVersion++

$newVersion = $versions[0] + '.' + $minorVersion + '.' + $versions[2]

$package.version = $newVersion
$package | ConvertTo-Json | Out-File version.json -Encoding ascii

$npmPackage = Get-Content package.json | ConvertFrom-Json
$npmPackage.version = $newVersion
$npmPackage | ConvertTo-Json | Out-File package.json -Encoding ascii

$versionTemplate = @"
export class RuntimeVersion {
    public static version = '<version_placeholder>';
}
"@
$versionTemplate.Replace("<version_placeholder>", $newVersion) | Out-File "src\version.ts" -Encoding ascii
