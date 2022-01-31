const express = require("express");
const router = express.Router();
const db = require("../../db/connection");

// Create a role
router.post("/roles", ({ body }, res) => {
  const sql = ``;
  const params = [body.title, body.salary, body.department_id];

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

// export router object
module.exports = router;
