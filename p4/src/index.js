import { readdir, statSync, open } from 'fs'

const UTF8 = 'utf8'

const stateTpl = {
  lastProjectNumber: 999,
  rootDirectory: 'C:\\dev\\projects\\100PIn2020',
  projects: []
}

const projectTpl = {
  code: '',
  number: '',
  title: '',
  description: '',
  createdOn: undefined
}

//Get directories list (project codes)
readdir(stateTpl.rootDirectory, { encoding: UTF8, withFileTypes: true }, (err, files) => {
  if (err) {
    return console.log('Unable to scan directory: ' + err)
  }

  //For each project
  files.forEach(file => {
    if (file.isDirectory && file.name.startsWith('p')) {
      //Retrieve project number from project code
      const number = file.name.substring(1)
      console.log(number)
      //Open README file
      open()
      //Retrieve the title from README files
      //Retrieve the description from README files
      //Close README file
      //Retrieve the date when README file has been created (project start date)
      const createdOn = statSync(stateTpl.rootDirectory + '\\' + file.name + '\\README.md', {
        bigint: true
      }).ctime
    }
  })
})
