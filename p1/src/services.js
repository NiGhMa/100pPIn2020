const unicornsRegExp = /(\[[^|]+\]\([^|]+\))/gi;
const planRegExp = /(- \[ \] )/gi;

const affixesCode = {
  Inspired: "INSPIRED",
  Tool: "TOOL",
  LessThan2Hours: "LT2",
  Wip: "WIP"
};

function ask(code) {
  return [
    {
      type: "confirm",
      name: "go",
      message: "Do you want to create the next project {" + code + "}?",
      default: false
    },
    {
      type: "input",
      name: "title",
      message: "What's the title?",
      default: "My best project"
    },
    {
      type: "input",
      name: "description",
      message: "Please write a short description."
    },
    {
      type: "checkbox",
      message: "What affix(es) do you want to add?",
      name: "affixes",
      pageSize: 5,
      choices: [
        {
          name: "Inspired"
        },
        {
          name: "Tool"
        },
        {
          name: "LessThan2Hours"
        },
        {
          name: "Wip",
          checked: true
        }
      ]
    },
    {
      type: "input",
      name: "unicorns",
      message: "Which unicorn(s) do you want to thank?",
      default: "[name](link)|[name](link)",
      when: answers => answers.affixes.includes("Inspired"),
      validate: function(value) {
        const validated = value.match(unicornsRegExp);
        if (!validated) {
          return "You have to thank at least 1 unicorn.";
        }
        return true;
      }
    },
    {
      type: "editor",
      name: "plan",
      message: "What's the plan?",
      default: "- [ ] ...",
      validate: function(text) {
        const lines = text.split("\n");
        var result;
        lines.forEach(line => {
          let validated = line.match(planRegExp);
          if (!validated && line.trim().length > 0) {
            result = "Your tasks should always start like `- [ ] `";
          }
        });
        if (result) {
          return result;
        }
        return true;
      }
    }
  ];
}

module.exports = {
  ask,
  affixesCode
};
