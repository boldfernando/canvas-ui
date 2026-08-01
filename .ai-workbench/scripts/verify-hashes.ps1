$Artifact = (Get-ChildItem 'c:\Users\fjuni\Documents\GitHub\Jules-halls\canvas-ui\.ai-workbench\artifacts\chat' -Recurse -Filter *agymd-smoke-test.md).FullName
$Latest = 'c:\Users\fjuni\Documents\GitHub\Jules-halls\canvas-ui\.ai-workbench\artifacts\chat\latest.md'

$ArtifactHash = (Get-FileHash $Artifact -Algorithm SHA256).Hash
$LatestHash   = (Get-FileHash $Latest -Algorithm SHA256).Hash

[pscustomobject]@{
    Artifact       = $Artifact
    ArtifactExists = Test-Path $Artifact
    LatestExists   = Test-Path $Latest
    ArtifactSHA256 = $ArtifactHash
    LatestSHA256   = $LatestHash
    Identical      = $ArtifactHash -eq $LatestHash
} | Format-List
