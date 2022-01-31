var apiRoutes = require("../routes/apiRoutes");
var inquirer = require("inquirer");
const db = require("../db/connection");

//view all answers
function answer(sql) {
  db.query(sql, (err, rows) => {
    if (err) {
      console.log(err);
    }
    console.log("");
    console.table(rows);
  });
}

const DB = {
  //view all questions
  ViewAllDepartments() {
    const sql = `SELECT * FROM departments`;
    answer(sql);
  },
  ViewAllRoles() {
    const sql = `SELECT * FROM roles`;
    answer(sql);
  },
  ViewAllEmployees() {
    const sql = `SELECT * FROM employees`;
    answer(sql);
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
      sql = `INSERT INTO departments (department_name) VALUES ('${answer.department_name}')`;

      db.query(sql, (err, rows) => {
        if (err) {
          console.log(err);
        }
        console.log(rows);
      });
    });
  },
  AddaRole() {
    console.log(db);
  },
  AddanEmployee() {
    console.log("Managers");
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
