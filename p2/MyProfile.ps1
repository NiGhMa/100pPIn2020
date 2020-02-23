# PowerShell tools for lazy creators
# author: NiGhMa
# version: 0.0.1

# GIT prompt
Import-Module posh-git

function prompt {
  if (($pwd.Path.Split('\').count -gt 3)){
    write-host "$($pwd.path.split('\')[0], '…', $pwd.path.split('\')[-2], $pwd.path.split('\')[-1] -join ('\'))" -NoNewline
  } else {
    Write-Host "$($pwd.path)" -NoNewline
  }

  if(Get-Module Posh-git) {
    Write-VcsStatus
    Write-Host "" -NoNewline
  }
  
  "> "
}

# touch command
function createFile($fn) {
  New-Item -ItemType file $fn
}

Set-Alias -Name touch -Value createFile

