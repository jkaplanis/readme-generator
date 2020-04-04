// TODO: Return markdown string for README file given a data object.
function generateMarkdown(answers) {
  return `
# ${answers.title}
![License: ${answers.license}](https://img.shields.io/badge/License-${answers.license}-blue.svg)

## Description

${answers.description}


## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [Contributing](#contributing)
- [Tests](#tests)
- [Questions](#questions)

## Installation

\`\`\`
${answers.installation}
\`\`\`

## Usage

${answers.usage}

## License

\`\`\`
${answers.license}
\`\`\`

## Contributing

${answers.contributing}

## Tests

\`\`\`
${answers.tests}
\`\`\`

## Questions

<img src="${answers.avatar_url}" alt="avatar" style="border-radius: 64px" width="60"/>

If you have any questions about the repo, open an issue or contat [${answers.username}](${answers.html_url}) directly at [${answers.email}](mailto:${answers.email}).`;
}

module.exports = generateMarkdown;
