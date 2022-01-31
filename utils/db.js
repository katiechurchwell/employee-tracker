var inquirer = require("inquirer");
const db = require("../db/connection");
const express = require("express");
const router = express.Router();

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
      router.post("/roles", (answer, res) => {
        const sql = `INSERT INTO departments (department_name) VALUES ('${answer.department_name}'`;
        const params = [answer.department_name];
      
        db.query(sql, params, (err, rows) => {
          if (err) {
            res.status(400).json({ error: err.message });
            return;
          }
          console.log(rows)
        });
      });
      // db.connect(function (err) {
      //   if (err) throw err;
      //   var sql = `INSERT INTO departments (department_name) VALUES ('${answer.department_name}')`;
      //   db.query(sql, function (err, result) {
      //     if (err) throw err;
      //     console.log("1 record inserted");
      //   });
      // });
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
