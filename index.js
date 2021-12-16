// TODO: Include packages needed for this application
const inquirer = require('inquirer');
const fs = require('fs');
const generateMarkdown = require('./utils/generateMarkdown.js');
const mockData = require('./utils/mockData.js')
const { rejects } = require('assert');

// Title of Project
// Description 
// Table of Contents (optional)
// Installation Instructions
// Usage
// License
// Contributing
// Test instructions
// Questions (github user, email)

let results = {};

// TODO: Create an array of questions for user input
const questions = [
    {
        type: 'input',
        name: 'title',
        message: 'What is the project name? (Required)',
        validate: input => input ? true :  console.log('Please enter a project name')
    },
    {
        type: 'input',
        name: 'description',
        message: "Enter a project description (Required)",
        validate: input => input ? true :  console.log('Please enter a description')
    },
    {
        type: 'confirm',
        name: 'tableOfContents',
        message: 'Include a table for contents?',
        default: true
    },
    {
        type: 'input',
        name: 'credit',
        message: 'List any collaborations, links or third party-assets here:',
        filter: contributions => !contributions ? 'No credits' : contributions
    },
    {
        type: 'list',
        name:  'license',
        message: 'Choose a license to use:',
        choices: ['Apache License 2.0', 'Boost Software License 1.0', 'BSD 3-Clause License', 'Eclipse Public License 1.0', 'GNU GPLv3', 'GNU GPLv2', 'GNU AGPLv3', 'GNU LGPLv3','GNU FDLv1.3', 'ISC', 'MIT', 'Mozilla Public License 2.0', 'No License'  ]
    },
    {
        type: 'input',
        name: 'contributing',
        message: 'Fill in the contribution section (Required) ',
        validate: input => input ? true :  console.log('Please enter how to contribute')
    },
    {
        type: 'input',
        name: 'tests',
        message: 'Write any sample tests to run! ',
    },
    {
        type: 'input',
        name: 'github',
        message: 'Please enter your Github name (Required)',
        filter: github => github[0].toUpperCase() + github.slice(1),
        validate: input => input ? true :  console.log('Please enter a Github name')
    },
    {
        type: 'input',
        name: 'email',
        message: 'Please enter your Email (Required)',
        validate: input => input ? true :  console.log('Please enter an Email')
    }
];


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
                return input ? true :  console.log('Please enter a step details')
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

    return inquirer.prompt(questionsList.slice(0,3))
    .then(ans => {
        let {title, description, tableOfContents} = ans;
        results = {title, description, tableOfContents}
    })
    .then(() => {
        return promptInstructions('installation',[],1)
    })
    .then(installationSteps => {
        results['installation'] = installationSteps;
        return promptInstructions('usage',[],1)
    })
    .then(usageSteps => {
        results['usage'] = usageSteps;
        return inquirer.prompt(questionsList.slice(3))
    })
    .then(ans => {
        results = Object.assign(results, ans);
        return results;
    })
}
// TODO: Create a function to write README file
function writeToFile(fileName, data) {

    let readmefile = generateMarkdown(data);

    fs.writeFile(fileName, readmefile, err => {
        return new Promise((resolve, reject) => {
            if(err){
                reject(err);
                return;
            }
            resolve({
                ok: true,
                message: 'ReadME File Created'
            });
        });
    });
}

// TODO: Create a function to initialize app
function init() {
    promptReadme(questions)
    .then(readmeData => {
        writeToFile('./result/README.md',readmeData )
    })
}

function test() {
    console.log(mockData);
    writeToFile('./result/README.md',mockData ) 
}

// Function call to initialize app
//init();

// Uncomment test to test the code with mock data
test()




