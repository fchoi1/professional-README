// TODO: Create a function that returns a license badge based on which license is passed in
// If there is no license, return an empty string
function renderLicenseBadge(license) {
  return !license ? "" : ''
}

// TODO: Create a function that returns the license link
// If there is no license, return an empty string
function renderLicenseLink(license) {
  return !license ? "" : ''

}

// TODO: Create a function that returns the license section of README
// If there is no license, return an empty string
function renderLicenseSection(license) {
  `
  ## License
  This application is under the ${license} License  
  For more information please view here: [License Description](${renderLicenseLink(license)})
`

  return !license ? "" : ''

}
function generateSteps(instructions){
  let stepNum = 1;
  let str = '';
  for(step of instructions){
    instructions.length == stepNum ? 
      str += `  ${stepNum}. ${step}` : str += `  ${stepNum}. ${step} \n`;
    stepNum++;
  }
  return str
}

function useTableOfContents(useTOC){
  let str = `## Table of Contents
  * [Installation](#installation)
  * [Usage](#usage)
  * [Credits](#credits)
  * [License](#license)`
  return useTOC ? 
  str : '<!--' + str + '-->';
}
// TODO: Create a function to generate markdown for README
function generateMarkdown(data) {
  let {title, description, tableOfContents, installation, usage, credit, license, contributing, github, email } = data;
  return `\
# ${title}

## Description
${description}

${useTableOfContents(tableOfContents)}

## Installation
${generateSteps(installation)}

## Usage
${generateSteps(usage)}

## Credits
${credit}



## Contributions
${contributing}

## Questions

See more about my Github here:  [${github}](www.github.com/${github})  
Any burning questions you want to ask me?  
Reach out to me! [${email}](mailto:${email})

`;
}

module.exports = generateMarkdown;
