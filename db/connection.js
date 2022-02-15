const mysql = require("mysql2");

// Connect to database
const db = mysql.createConnection(
    {
      host: "localhost",
      // Your MySQL username,
      user: "root",
      // Your MySQL password
      password: "t6I6m6N9p",
      database: "company",
    },
);

console.log("Connected to the company database.");

db.connect(function(err) {
  if (err) throw err
});
  
module.exports = db;