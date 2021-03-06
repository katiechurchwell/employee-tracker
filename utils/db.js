var inquirer = require("inquirer");
const db = require("../db/connection");
const userPrompts = require("./userPrompts");
const index = require("../index");

//VIEW RESULTS FUNCTIONS
//As a table
function resultTable(sql, answer) {
  db.query(sql, answer, (err, rows) => {
    if (err) {
      console.log(err);
    }
    console.table(rows);
    index.app();
  });
}
//with a notification
function resultaddNotice(sql, answer) {
  db.query(sql, answer, (err, rows) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log("Entry recorded!");
    index.app();
  });
}

//CHOICES
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
    ];
    inquirer.prompt(questions).then(async (answer) => {
      //DISPLAY DEPARTMENTS
      await db
        .promise()
        .query(`SELECT * FROM departments`)
        .then(async (departments) => {
          const departmentId = await inquirer.prompt([
            {
              type: "list",
              name: "department",
              message: "Department?",
              choices: departments[0].map((department) => ({
                name: department.department_name,
                value: department.id,
              })),
            },
          ]);
          //ENTER INTO DATABASE
          const sql = `INSERT INTO roles (title, salary, departments_id) VALUES (?,?,?)`;
          const params = [answer.title, answer.salary, departmentId.department];
          resultaddNotice(sql, params);
        });
    });
  },
  //ADD EMPLOYEE
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
    ];

    inquirer.prompt(questions).then(async (answer) => {
      //DISPLAY ROLES AND GET ID
      await db
        .promise()
        .query(`SELECT * FROM roles`)
        .then(async (roles) => {
          const roleId = await inquirer.prompt([
            {
              type: "list",
              name: "role",
              message: "Pick your role.",
              choices: roles[0].map((role) => ({
                name: role.title,
                value: role.id,
              })),
            },
          ]);

          //DISPLAY MANAGERS AND GET ID
          await db
            .promise()
            .query(`SELECT * FROM employees WHERE role_id=1;`)
            .then(async (managers) => {
              const managerId = await inquirer.prompt([
                {
                  type: "list",
                  name: "manager",
                  message: "Pick your manager.",
                  choices: managers[0].map((manager) => ({
                    name: manager.first_name + " " + manager.last_name,
                    value: manager.id,
                  })),
                },
              ]);

              //INSERT INTO DATABASE
              await db
                .promise()
                .query(
                  `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES(?,?,?,?)`,
                  [
                    answer.first_name,
                    answer.last_name,
                    roleId.role,
                    managerId.manager,
                  ]
                )
                .then(() => {
                  console.log("Entry added!");
                  index.app();
                })
                .catch(console.log)
                .then(() => userPrompts.promptHomeMenu());
              return "";
            });
        });
    });
  },
  //UPDATE AN EMPLOYEE
  UpdateanEmployeeRole() {
    //SHOW ALL EMPLOYEES AS LIST
    const sql = `SELECT * FROM employees`;
    db.query(sql, (err, employees) => {
      if (err) {
        console.log(err);
        return;
      }
      inquirer
        .prompt([
          {
            type: "list",
            name: "employee",
            message: "Pick the employee to update.",
            choices: employees.map((employee) => ({
              name: employee.first_name + " " + employee.last_name,
              value: employee,
            })),
          },
        ])
        //DISPLAY EMPLOYEE CHOICE
        .then((choice) => {
          //SELECT FIELD TO UPDATE
          inquirer
            .prompt([
              {
                type: "list",
                name: "employeeField",
                message: "Pick a field to update",
                choices: Object.keys(choice.employee),
              },
            ])
            .then((field) => {
              inquirer
                .prompt([
                  {
                    name: "employeeUpdate",
                    message: "Update " + field.employeeField,
                  },
                ])
                .then((update) => {
                  const employeeToUpdate = choice.employee.id;
                  const fieldToUpdate = field.employeeField;
                  const updateValue = update.employeeUpdate;

                  const sql = `UPDATE employees SET ${fieldToUpdate} = '${updateValue}' WHERE id= ${employeeToUpdate}`;

                  resultaddNotice(sql);
                });
            });
            console.log(choice)
        });
    });
  },
  //QUIT
  Quit() {
    console.log("Bye");
  },
};

module.exports = DB;
