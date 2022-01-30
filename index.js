var inquirer = require("inquirer");

const menuChoice = {
  type: 'list',
  name: 'chocolate',
  message: "What's your favorite chocolate?",
  choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role'],
}

// function promptHome() {
  inquirer.prompt(menuChoice);
// }

// async function app() {
//   const { menuChoice } = await promptHome();
// }

// app();
