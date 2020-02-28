// ES5 is used for this project
const inquirer = require('inquirer')
const fs = require('fs')
const path = require('path')
const GitCommandLine = require('git-command-line')
const exec = require('child_process').exec

const UTF8 = 'utf8'
const GIT_BRANCH_MAIN = 'master'

const state = require('../res/state.json')
const services = require('./services')

const newProjectNumber = state.lastProjectNumber + 1
const newProjectCode = 'p' + newProjectNumber
const newProjectPath = path.join(state.rootDirectory, '/' + newProjectCode + '/')

inquirer.prompt(services.ask(newProjectCode)).then(answers => {
  if (answers.go) {
    if (!fs.existsSync(newProjectPath)) {
      doTheJob()
    } else {
      console.log('Project ' + newProjectCode + ' already exists! Please check your state file.')
    }
  }
})

function doTheJob() {
  inquirer.prompt(services.askDetails()).then(answers => {
    // Init Git branch
    console.log('Creating git branch...')
    var git = new GitCommandLine(state.rootDirectory)

    git
      .checkout(GIT_BRANCH_MAIN)
      .then(() => git.checkout('-b ' + newProjectCode))
      .then(res => {
        console.log('Success: ', res)

        // create directory
        console.log('Creating directory...')
        fs.mkdirSync(newProjectPath, { recursive: true })

        // get README Template
        console.log('Initializing README file...')
        var readmeFile = fs.readFileSync(path.join(__dirname, '../res/README.tpl'), UTF8)

        const date = new Date().toJSON()

        // create README based on template
        readmeFile = readmeFile
          .replace('{TITLE}', answers.title)
          .replace('{CODE}', newProjectCode)
          .replace('{LONG_DESCRIPTION}', answers.description)
          .replace('{PLAN}', answers.plan)
          .replace('{UNICORNS}', writeUnicrons(answers.unicorns))
          .replace('{STARTED_ON}', date)

        // write README
        writeFile(newProjectPath + 'README.md', readmeFile)

        // update state.json
        console.log('Updating repository state...')
        var newState = state
        newState.lastProjectNumber = newProjectNumber
        newState.projects.push({
          code: newProjectCode,
          number: newProjectNumber,
          title: answers.title,
          description: answers.description,
          createdOn: date
        })

        // write state.json
        writeFile(path.join(__dirname, '../res/state.json'), JSON.stringify(newState, null, 2))

        // add reference in main README
        console.log('Adding project reference in main README...')
        var affixes = ''
        answers.affixes.forEach(affixe => {
          affixes += services.affixesCode[affixe]
        })

        var ref =
          '| ' +
          '[' +
          newProjectCode +
          '](./' +
          newProjectCode +
          '/README.md)' +
          ' | ' +
          affixes +
          ' | ' +
          answers.title +
          ' |\n'

        fs.appendFileSync(state.rootDirectory + '/README.md', ref, {
          encoding: 'utf8'
        })

        // Start VSCode in the project directory and open README.md
        console.log('Starting VS Code...')

        console.log('Done!')
      })
      .then(() => git.add('*'))
      .then(() => git.commit('-am "Init ' + newProjectCode + ' project"'))
      .then(() => exec('cd ' + newProjectPath))
      .then(() => exec('code . README.md'))
      .then(() =>
        console.log(
          '\n*** Please push the project to the repo and create a pull request to update the project state.json ***\nhttps://github.com/NiGhMa/100PIn2020'
        )
      )
      .fail(err => console.log('Error:', err))
  })
}

function writeUnicrons(unicorns) {
  if (unicorns) {
    var result
    const lines = unicorns.split('\n')
    lines.forEach(unicorn => {
      result += '🦄 ' + unicorn + '\n'
    })
    return result
  } else {
    return '🦓 I do/did it by my own this time!'
  }
}

function writeFile(path, content) {
  var fd = fs.openSync(path, 'w+')
  fs.writeFileSync(path, content, {
    encoding: UTF8,
    mode: '777'
  })
  fs.closeSync(fd)
}
