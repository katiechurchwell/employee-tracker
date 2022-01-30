var inquirer = require("inquirer");

const userPrompts = {
  promptHomeMenu() {
    return inquirer.prompt([
      {
        type: "list",
        name: "menuChoice",
        message: "What would you like to do?",
        choices: [
          "View All Departments",
          "View All Roles",
          "View All Employees",
          "Add a Department",
          "Add a Role",
          "Add an Employee",
          "Update an Employee Role",
          "Quit",
        ],
      },
    ]);
  },
};

module.exports = userPrompts