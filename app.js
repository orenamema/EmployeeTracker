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

//   function addDpt () {
//     console.log("Inserting a new department..\n");
//     var query = connection.query(
//       "INSERT INTO department SET ?",
//       function (err, res) {
//         console.log(res.affectedRows + "department inserted!\n");
//       }
//     );
//     console.log(query.sql);
//   }

  function start() {
    inquirer
      .prompt([
        {
          type: "list",
          message: "What would you like to do?",
          name: "choice",
          choices: ["add departments","add roles", "add employees ",
          "view departments", "view roles", "view employees", "update employees" ]
  
        }
      ]).then(function (res) {
        if (res.choice === "add departments") {
            console.log ("add departments")
            addDpt();    
        }
        else if (res.choice === "add roles"){
            addRole();
        }
        else if (res.choice === "add employees"){
            addEmployee();
        }
        else if (res.choice ==="view departments"){
            viewDepartment();
        }
        else if (res.choice ==="view roles"){
            viewRole();
        }
        else if (res.choice ==="view employees"){
            viewEmployee();
        }
        else if (res.choice ==="update employees"){
            updateEmployee();
        }
    })
}