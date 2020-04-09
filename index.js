// require fs, path, inquirer, GitHub API, and GenerateMardown
const fs = require("fs");
const path = require("path");
const inquirer = require("inquirer");
const api = require("./utils/api.js");
const generateMarkdown = require("./utils/generateMarkdown.js");

// Array of questions to ask user via Inquirer
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

// Define function to synhronously write data to new file
function writeToFile(fileName, data) {
  fs.writeFileSync(fileName, data);
}

// init function runs inquirer
function init() {
  inquirer.prompt(questions).then(answers => {
    // Use answers to run getUser function
    api.getUser(answers.username).then(githubData => {
      // add avatar and user's GitHub url to the answers object
      answers.avatar_url = githubData.avatar_url;
      answers.html_url = githubData.html_url;

      // Call generateMardown function passing answers object
      // and save the returned markdown to const
      const markdown = generateMarkdown(answers);
      console.log("Generating file...");

      // Call writeToFile function passing file location/name
      // and markdown string
      writeToFile("new-markdown/readme.md", markdown);

      // Create and log link to new file
      const readmePath = path.resolve("./new-markdown/readme.md");
      console.log(`File location: ${readmePath}`);
    });
  });
}

// Call init function
init();
