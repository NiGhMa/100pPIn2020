// ES5 is used for this project
const inquirer = require("inquirer");
const fs = require("fs");
var path = require("path");
var mkdirp = require("mkdirp");

const state = require("../res/state.json");
const services = require("./services");

const newProject = state.lastProjectNumber + 1;
const newProjectCode = "p" + newProject;
const newProjectPath = path.join(state.rootDirectory, newProjectCode + "/");

function writeUnicrons(unicorns) {
  if (unicorns) {
    var result;
    const lines = unicorns.split("\n");
    lines.forEach(unicorn => {
      result += "🦄 " + unicorn + "\n";
    });
    return result;
  } else {
    return "🦓 I do/did it by my own this time!";
  }
}

inquirer.prompt(services.ask(newProjectCode)).then(answers => {
  console.log(JSON.stringify(answers));

  if (!fs.existsSync(newProjectPath)) {
    mkdirp(newProjectPath);

    var readmeFile = fs.readFileSync(
      path.join(__dirname, "../res/README.tpl"),
      "utf8"
    );
    // create README.md
    readmeFile = readmeFile
      .replace("{TITLE}", answers.title)
      .replace("{CODE}", newProjectCode)
      .replace("{LONG_DESCRIPTION}", answers.description)
      .replace("{PLAN}", answers.plan)
      .replace("{UNICRONS}", writeUnicrons(answers.unicorns));

    fs.writeFileSync(newProjectPath + "README.md", readmeFile);

    // update state.json
    // write state.json
    // add reference in main README
    // create branch
    // add file into branch
    // commit first files
    // start VSCode in the project directory and open README.md
  } else {
    console.log(
      "Project " +
        newProjectCode +
        " already exists! Please check your state file"
    );
  }
});
