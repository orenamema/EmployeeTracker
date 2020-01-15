var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "password",
  database: "trackerdb"
});
connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    start();
  
  });

  function addDpt (dpt) {
    console.log("Inserting a new department..\n");
    console.log(dpt);
    var query = connection.query(
      "INSERT INTO department SET ?",
      function (err, res) {
        console.log(res.affectedRows + "department inserted!\n");
      }
    );
    console.log(query.sql);
  }

  function start() {
    inquirer
      .prompt([
        {
          type: "list",
          message: "add, view or update",
          name: "choice",
          choices: ["add departments","add roles", "add employees ",
          "view departments", "view roles", "view employees", "update employees" ]
  
        }
      ]).then(function (res) {
        console.log(res.choice);
  
  
        if (res.choice === "add departments") {
  
          inquirer.prompt([
            {
              type: "input",
              message: "what is the name of the department?",
              name: "name"
            },

        ]).then(function (res) {

            addDpt(
              {
                Dptname: res.name,
              });

// Build a command-line application that at a minimum allows the user to:
// Add departments, roles, employees
// View departments, roles, employees
// Update employee roles