// TODO: Include packages needed for this application
const inquirer = require('inquirer');
const fs = require('fs');
const generateMarkdown = require('./utils/generateMarkdown.js');

// Title of Project
// Description 
// Table of Contents (optional)
// Installation Instructions
// Usage
// License
// Contributing
// Test instructions
// Questions (github user, email)


// TODO: Create an array of questions for user input
const questions = [
    {
        type: 'input',
        name: 'name',
        message: 'What is the project name? (Required)',
        validate: input => {
            return input ? true :  console.log('Please enter a project name');
        }
    },
    {
        type: 'input',
        name: 'description',
        message: "Enter a project description (Required)",
        validate: input => {
            return input ? true :  console.log('Please enter a description');
        }
    },
    {
        type: 'confirm',
        name: 'tableOfContents',
        message: 'Include a table for contents?',
        default: true
    }
];

const installation = [
    {
        type: 'input',
        name: 'name',
        message: '',
        validate: input => {
            return input ? true :  console.log('Please enter a project name');
        }
    },
]

const promptInstructions = (type, instructionList=[], step=1) => {
    if(!instructionList){
        instructionList = [];
        step = 1;
    } 
    return inquirer.prompt([
        {
            type: 'input',
            name: 'instruction',
            message: `Add Step #${step} details for ${type}`,
            validate: input => {
                return input ? true :  console.log('Please enter a step details');
            }
        },
        {
            type: 'confirm',
            name: 'moreSteps',
            message: 'Add more steps?',
            default: true,
        }
    ]).then(instructionData => {
        instructionList.push(instructionData.instruction);
        step += 1;
        return instructionData.moreSteps ? promptInstructions(type, instructionList, step) : instructionList;
    }) 
}

const promptReadme = questionsList => {
    return inquirer.prompt(questionsList)
}
// TODO: Create a function to write README file
function writeToFile(fileName, data) {}

// TODO: Create a function to initialize app
function init() {
    promptReadme(questions)
    .then(ans => {
    })
    .then(() => {
        return promptInstructions('installation',[],1)
    })
    .then(installationSteps => {
        console.log(installationSteps)
    })
}

// Function call to initialize app
init();




