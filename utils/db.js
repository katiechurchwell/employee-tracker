var inquirer = require("inquirer");
const db = require("../db/connection");

//table view results
function resultTable(sql, answer) {
  db.query(sql, answer, (err, rows) => {
    if (err) {
      console.log(err);
    }
    console.table(rows);
  });
}

//add notification results
function addNotice(sql, answer) {
  db.query(sql, answer, (err, rows) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log(answer + " added!");
  });
}

const DB = {
  //view all questions
  ViewAllDepartments() {
    const sql = `SELECT * FROM departments`;
    resultTable(sql);
  },
  ViewAllRoles() {
    const sql = `SELECT * FROM roles`;
    resultTable(sql);
  },
  ViewAllEmployees() {
    const sql = `SELECT * FROM employees`;
    resultTable(sql);
  },
  //add questions
  AddaDepartment() {
    const questions = [
      {
        name: "department_name",
        message: "What's the new department's name?",
      },
    ];

    inquirer.prompt(questions).then((answer) => {
      const sql = `INSERT INTO departments SET ?`;
      resultAddNotice(sql, answer);
    });
  },
  AddaRole() {
    //title, salary, department
    const questions = [
      {
        name: "title",
        message: "Role name?",
      },
      {
        name: "salary",
        message: "Salary?",
      },
      {
        name: "department",
        message: "Department name?",
      },
    ];
    inquirer.prompt(questions).then((answer) => {
      // const sql = `INSERT INTO roles SET ?`;
      // resultAddNotice(sql, answer);
    });
  },
  AddanEmployee() {
    //first, last, role, manager
    const questions = [
      {
        name: "first_name",
        message: "First name?",
      },
      {
        name: "last_name",
        message: "Last name?",
      },
      {
        name: "role",
        message: "Role?",
      },
      {
        name: "manager",
        message: "Manager?",
      },
    ];

    inquirer.prompt(questions).then((answer) => {
      // const sql = `INSERT INTO employees SET ?`;
      // resultAddNotice(sql, answer);
    });
  },
  //update questions
  UpdateanEmployeeRole() {
    console.log("Managers");
  },
  //quit
  Quit() {
    console.log("Bye");
  },
};

module.exports = DB;
