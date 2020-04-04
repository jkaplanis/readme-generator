const fs = require("fs");
const path = require("path");
const inquirer = require("inquirer");
// TODO: import api and generateMarkdown modules from ./utils/
const api = require("./utils/api.js");
const generateMarkdown = require("./utils/generateMarkdown.js");
// TODO: Add inquirer question objects to questions array. This should
// include all the necessary questions for the user.

const questions = [
  { type: "input", name: "username", message: "What is your GitHub username?" },
  { type: "input", name: "email", message: "What is your GitHub email?" },
  { type: "input", name: "title", message: "What is the name of your app?" },
  {
    type: "input",
    name: "description",
    message: "How would you describe your app?"
  },
  {
    type: "input",
    name: "installation",
    message: "What command should be run to install dependencies?",
    default: "npm i"
  },
  {
    type: "input",
    name: "usage",
    message: "What does the user need to know about using the repo?"
  },
  {
    type: "input",
    name: "license",
    message: "What kind of license should your project use?",
    default: "MIT"
  },
  {
    type: "input",
    name: "contributing",
    message: "What does the user need to know about contributing?"
  },
  {
    type: "input",
    name: "tests",
    message: "What command should be run to run tests?",
    default: "npm test"
  }
];

// TODO: Write function to synchronously write data in the
// current working directory to file named for the fileName parameter.
// The data parameter is the text to write to the file.
function writeToFile(fileName, data) {
  fs.writeFileSync(fileName, data);
}

// TODO: Use inquirer to prompt the user for each question in the
// questions array. Then call api.getUser to fetch the user profile
// data from GitHub. Finally generate the markdown and use writeToFile
// to create the README.md file.
function init() {
  inquirer.prompt(questions).then(answers => {
    api.getUser(answers.username).then(githubData => {
      answers.avatar_url = githubData.avatar_url;
      answers.html_url = githubData.html_url;
      const markdown = generateMarkdown(answers);
      console.log("Generating file...");
      writeToFile("new-markdown/readme.md", markdown);
      const readmePath = path.resolve("./new-markdown/readme.md");
      console.log(`File location: ${readmePath}`);
    });
  });
}

init();
