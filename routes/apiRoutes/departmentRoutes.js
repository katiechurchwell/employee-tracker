const express = require("express");
const router = express.Router();
const db = require("../../db/connection");

// ALL departments
router.get("/departments", (req, res) => {
    const sql = ``;
  
    db.query(sql, (err, rows) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({
        message: "success",
        data: rows,
      });
    });
  });
  
  // Get a single department
  router.get("/department/:id", (req, res) => {
    const sql = ``;
    const params = [req.params.id];
  
    db.query(sql, params, (err, row) => {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      res.json({
        message: "success",
        data: row,
      });
    });
  });
  
  // Delete a department
  router.delete("/department/:id", (req, res) => {
    const sql = `DELETE FROM departments WHERE id = ?`;
    const params = [req.params.id];
  
    db.query(sql, params, (err, result) => {
      if (err) {
        res.statusMessage(400).json({ error: res.message });
      } else if (!result.affectedRows) {
        res.json({
          message: "Department not found",
        });
      } else {
        res.json({
          message: "deleted",
          changes: result.affectedRows,
          id: req.params.id,
        });
      }
    });
  });
  
  // Create a department
  router.post("/department", ({ body }, res) => {
    const errors = inputCheck(
      body,
      "id",
      "department_name"
    );
    if (errors) {
      res.status(400).json({ error: errors });
      return;
    }
    const sql = ``;
    const params = [body.id, body.department_name];
  
    db.query(sql, params, (err, result) => {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      res.json({
        message: "success",
        data: body,
      });
    });
  });
  
  //export router object
  module.exports = router;
  