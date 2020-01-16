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
          "view departments", "view roles", "view employees", "update employees","all done?" ]
  
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
        else {
            console.log("Thank you! Come again!");
        }
    })
}

function addDpt () {
    inquirer.prompt([
    {
        type:"input",
        name: "name",
        message: "what is the department name?"
    }

    ]).then(function(res){
        connection.query(`INSERT INTO department (name)
                          VALUES ("${res.name}");`
                        , function (error, results, fields) {
            if (error) throw error;
            console.log('Department added to DB');
        });
        start();
    })
}
function addRole () {
    inquirer.prompt([
    {
        type:"input",
        name: "title",
        message: "what is the title?"
    },

    {
        type:"input",
        name: "salary",
        message: "what is the salary?"
    },

    {
        type:"input",
        name: "departmentid",
        message: "what is the department id?"
    }

    ]).then(function(res){
        connection.query(
            "INSERT INTO role SET ?",
            {
              title: res.title,
              salary: res.salary,
              department_id: res.departmentid
            },
        function (error) {
            if (error) throw error;
            console.log('Role added to DB');
        });
        start();
    })
}
function addEmployee () {
    inquirer.prompt([
    {
        type:"input",
        name: "firstname",
        message: "what is the employee first name?"
    },

    {
        type:"input",
        name: "lastname",
        message: "what is the employee last name?"
    },

    {
        type:"input",
        name: "roleid",
        message: "what is the employee role id?"
    },
    {
        type:"input",
        name: "managerid",
        message: "what is the employee manager id?"
    }

    ]).then(function(res){
        connection.query(
            "INSERT INTO role SET ?",
            {
              first_name: res.firstname,
              last_name: res.lastname,
              role_id: res.roleid,
              manager_id: res.managerid
            },
        function (error) {
            if (error) throw error;
            console.log('Employee added to DB');
        });
        start();
    })
}
