var inquirer = require("inquirer");

const questions = {
  "view all departments"() {
    console.log("departments");
  },
  "view all roles"() {
    console.log("roles");
  },
  "view all employees"() {
    console.log("employees");
  },
  "add a department"() {
    console.log("add department");
  },
  "add a role"() {
    console.log("add role");
  },
  "add an employee"() {
    console.log("add employee");
  },
  "update an employee role"() {
    console.log("update role");
  },
};

async function app() {
  const { menuChoice } = await promptHome();
}

app();
