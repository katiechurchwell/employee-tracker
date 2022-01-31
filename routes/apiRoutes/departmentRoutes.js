const express = require("express");
const router = express.Router();
const db = require("../../db/connection");

// Create a department
router.post("/departments", (answer, res) => {
  var sql = `INSERT INTO departments (department_name) VALUES ('${answer.department_name}')`;

  db.query(sql, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: answer.department_name
    });
  });
});

module.exports = router;
