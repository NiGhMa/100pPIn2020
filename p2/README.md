# PowerShell tools for lazy creators (p2)

This PowerShell script contains tools I like to use when developing. This project will growth as I'll find new useful commands and tips to add.

## Plan

- [x] Create my GitShell
- [x] Create `touch` command
- [x] Create `grep` command
- [x] Add SSH-Agent auto start

## What I've learned so far

✔ functions in PowerShell

✔ [posh-git](https://github.com/dahlbyk/posh-git)

## Unicrons (references)

🦄 none unicorn helps me for this so far

## Infos

Started on: 2020-02-23T05:00:00.000Z

## Troubleshooting

### Git commands to remote server still ask for passphrase

This script should ask your passphrase when it starts then no more. If it's not the case, please check the following:

- Git for Windows should be installed (check for `ProgramFiles/Git` for 64-bits version or for `ProgramFiles(x86)/Git` for 32-bits version).
- Your key should be registered (check with `ssh-add -l`). If not run `ssh-add /path/to/your/key/file` then restart your Shell to validate
- `C:\Windows\System32\OpenSSH` should be removed from path (environment variable)
