import { readdir, readFileSync, openSync, writeFileSync, closeSync } from 'fs'

const UTF8 = 'utf8'

const state = {
  lastProjectNumber: 999,
  rootDirectory: 'C:\\dev\\projects\\100PIn2020',
  projects: []
}

readdir(state.rootDirectory, { encoding: UTF8, withFileTypes: true }, (err, files) => {
  if (err) {
    return console.log('Unable to scan directory: ' + err)
  }

  files.forEach(file => {
    if (file.isDirectory && file.name.startsWith('p')) {
      //Get project code
      const code = file.name

      //Get project number from project code
      const number = parseInt(file.name.substring(1))

      //Get the date when README file has been created (project start date)
      // Can't use it as the creation date will change with Git
      // const createdOn = statSync(state.rootDirectory + '\\' + file.name + '\\README.md', {
      //   bigint: true
      // }).ctime

      //Open README file
      const readmePath = state.rootDirectory + '\\' + file.name + '\\README.md'

      const { title, description, createdOn } = getInfos(readmePath)
      //Put project info into state
      state.projects.push({
        code,
        number,
        title,
        description,
        createdOn
      })
    }
  })
  //Update lastProjectNumber
  state.lastProjectNumber = state.projects.length

  //Save state.json file
  const statePath = state.rootDirectory + '\\p1\\res\\state.json'
  const fd = openSync(statePath, 'w+')
  writeFileSync(statePath, JSON.stringify(state, null, 2), {
    encoding: UTF8,
    mode: '777'
  })
  closeSync(fd)
  console.log('state.json generated!')
})

function getInfos(readmePath) {
  const readmeFile = readFileSync(readmePath, UTF8)

  const lines = readmeFile.split('\n')
  //Get title and description
  let lineNo = 0
  let title = ''
  let description = ''
  let descDone = false
  let createdOn = ''

  lines.forEach(line => {
    //Get title
    if (line.startsWith('# ')) {
      title = line.replace('# ', '').replace(/(\s\(p[0-9]+\))/, '')
    }
    //Get description
    if (line.startsWith('## Plan')) {
      description = description.substring(0, description.length - 1)
      descDone = true
    }
    if (lineNo >= 2 && !descDone && line.length > 0) {
      description += line + '\n'
    }
    //Get createdOn
    if (line.startsWith('Started on: ')) {
      createdOn = line.replace('Started on: ', '')
    }
    lineNo++
  })

  return { title, description, createdOn }
}
