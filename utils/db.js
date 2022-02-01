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
function resultaddNotice(sql, answer) {
  db.query(sql, answer, (err, rows) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log("Entry recorded!");
  });
}

const DB = {
  //VIEW ALL
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
  //ADD
  //ADD DEPARTMENT
  AddaDepartment() {
    const questions = [
      {
        name: "department_name",
        message: "What's the new department's name?",
      },
    ];

    inquirer.prompt(questions).then((answer) => {
      const sql = `INSERT INTO departments SET ?`;
      resultaddNotice(sql, answer);
    });
  },
  //ADD ROLE
  AddaRole() {
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
      //FIND DEPARTMENT ID
      db.query(
        `SELECT id FROM departments WHERE department_name = ?;`,
        answer.department,
        (err, departmentIdObj) => {
          if (err) {
            console.log(err);
          }
          //ENTER INTO DATABASE
          const departmentId = departmentIdObj[0].id;
          const sql = `INSERT INTO roles (title, salary, department_id) VALUES (?,?,?)`;
          const params = [answer.title, answer.salary, departmentId];
          resultaddNotice(sql, params);
        }
      );
    });
  },
  AddanEmployee() {
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
      const manager = answer.manager.split(" ");
      const managerFirstName = manager[0];
      const managerLastName = manager[1];
      const roleTitle = answer.role;
      const params = [roleTitle, managerFirstName, managerLastName];
      //FIND ROLE ID AND MANAGER ID
      db.query(
        `SELECT id FROM roles WHERE title=?; SELECT id FROM employees WHERE first_name=? AND last_name=?`,
        params,
        (err, idObj) => {
          if (err) {
            console.log(err);
          }
          //ENTER INTO DATABASE
          console.log(idObj);
          // const sql = `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)`;
          // resultAddNotice(sql, answer);
        }
      );
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
