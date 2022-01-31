var apiRoutes = require("../routes/apiRoutes");
var inquirer = require("inquirer");
const db = require("../db/connection");

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
  AddaDepartment() {
    // router.post("/departments", ({ body }, res) => {
    //   const errors = inputCheck(body, "id", "department_name");
    //   if (errors) {
    //     res.status(400).json({ error: errors });
    //     return;
    //   }
    //   const sql = ``;
    //   const params = [body.id, body.department_name];
    
    //   db.query(sql, params, (err, result) => {
    //     if (err) {
    //       res.status(400).json({ error: err.message });
    //       return;
    //     }
    //     res.json({
    //       message: "success",
    //       data: body,
    //     });
    //   });
    // });
  },
  AddaRole() {
    console.log("Managers");
  },
  AddanEmployee() {
    console.log("Managers");
  },
  UpdateanEmployeeRole() {
    console.log("Managers");
  },
  Quit() {
    console.log("Bye");
  },
};

module.exports = DB;
