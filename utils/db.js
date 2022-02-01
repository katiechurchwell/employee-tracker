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
        type: "input",
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
    const questions = [
      {
        type: "input",
        name: "role_name",
        message: "What's the new role's name?",
      },
    ];
    inquirer.prompt(questions).then((answer) => {
      const sql = `INSERT INTO roles SET ?`;
      resultAddNotice(sql, answer);
    });
  },
  AddanEmployee() {
    const questions = [
      {
        type: "input",
        name: "employee_name",
        message: "What's the new employee's name?",
      },
    ];

    inquirer.prompt(questions).then((answer) => {
      const sql = `INSERT INTO employees SET ?`;
      resultAddNotice(sql,answer);
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
