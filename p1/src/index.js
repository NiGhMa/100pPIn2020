// ES5 is used for this project
const inquirer = require("inquirer");
const fs = require("fs");
var path = require("path");

const state = require("../res/state.json");
const services = require("./services");

const newProjectNumber = state.lastProjectNumber + 1;
const newProjectCode = "p" + newProjectNumber;
const newProjectPath = path.join(state.rootDirectory, newProjectCode + "/");

inquirer.prompt(services.ask(newProjectCode)).then(answers => {
  if (answers.go) {
    if (!fs.existsSync(newProjectPath)) {
      doTheJob();
    } else {
      console.log(
        "Project " +
          newProjectCode +
          " already exists! Please check your state file."
      );
    }
  }
});

function doTheJob() {
  inquirer.prompt(services.askDetails()).then(answers => {
    //console.log(JSON.stringify(answers));

    // create directory
    fs.mkdirSync(newProjectPath, { recursive: true });

    // get README Template
    var readmeFile = fs.readFileSync(
      path.join(__dirname, "../res/README.tpl"),
      "utf8"
    );

    // create README based on template
    readmeFile = readmeFile
      .replace("{TITLE}", answers.title)
      .replace("{CODE}", newProjectCode)
      .replace("{LONG_DESCRIPTION}", answers.description)
      .replace("{PLAN}", answers.plan)
      .replace("{UNICORNS}", writeUnicrons(answers.unicorns));

    // write README
    writeFile(newProjectPath + "README.md", readmeFile);

    // update state.json
    var newState = state;
    newState.lastProjectNumber = newProjectNumber;
    newState.projects.push({
      code: newProjectCode,
      number: newProjectNumber,
      description: answers.description,
      createdOn: new Date().toJSON()
    });

    // write state.json
    writeFile(
      path.join(__dirname, "../res/state.json"),
      JSON.stringify(newState, null, 2)
    );

    // add reference in main README
    // create branch
    // add file into branch
    // commit first files
    // start VSCode in the project directory and open README.md
  });
}

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

function writeFile(path, content) {
  var fd = fs.openSync(path, "w+");
  fs.writeFileSync(path, content, {
    encoding: "utf8",
    mode: "777"
  });
  fs.closeSync(fd);
}
