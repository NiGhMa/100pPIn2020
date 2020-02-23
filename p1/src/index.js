const inquirer = require("inquirer");

function goAhead() {
  inquirer
    .prompt([
      {
        type: "confirm",
        name: "goahead",
        message: "Would you like to encode your activities for today?",
        default: false
      }
    ])
    .then(answers => {
      answers.goahead ? goAhead() : console.log("Bye!");
    });
}

inquirer
  .prompt([
    {
      type: "confirm",
      name: "goahead",
      message: "Would you like to encode your activities for today?",
      default: false
    }
  ])
  .then(answers => {
    answers.goahead ? goAhead() : console.log("Bye!");
  });
