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



  function start() {
    inquirer
      .prompt([
        {
          type: "list",
          message: "What would you like to do?",
          name: "choice",
          choices: ["add departments","add roles", "add employees",
          "view employees by departments", "view employees by roles", "view employees", "update employees","all done?" ]
  
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
        else if (res.choice ==="view employees by departments"){
            viewDepartment();
        }
        else if (res.choice ==="view employees by roles"){
            viewRole();
        }
        else if (res.choice ==="view employees"){
            viewEmployee();
        }
        else if (res.choice ==="update employees"){
            updateEmployeeRole();
        }
        else { //we have to close the connection to close the program
            connection.end();
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
        connection.query(
            "INSERT INTO department SET ?",
            {
              name: res.name,
            },
        function (error) {
            if (error) throw error;

            console.log('Department added to DB');
            start();
        });
    })
}
function addRole() {
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
            start();
        });

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
            "INSERT INTO employee SET ?",
            {
              first_name: res.firstname,
              last_name: res.lastname,
              role_id: res.roleid,
              manager_id: res.managerid
            },
        function (error) {
            if (error) throw error;
            console.log('Employee added to DB');
            start();
        });
    })
}

//View Functions

function viewDepartment (){
    connection.query("SELECT * FROM department", function (err, res) {
        if (err) throw err;
        inquirer.prompt([
            {
                type: "list",
                name: "department",
                message: "Select departement",
                choices: function () {
                    var the_choices = []
                    for (var i = 0; i < res.length; i++) {
                        the_choices.push(res[i].name)
                    }
                    return the_choices;
                }
            }
        ]).then(function (ans) {
            connection.query(`
                select e.*
                from department d 
                inner join role r
                on d.id = r.department_id
                inner join employee e
                on e.role_id = r.id
                where d.name = "${ans.department}"
                `, function (err, res) {
                    if (err) throw err;
                    console.log(res);
                    start();
                });
        });
    });
}

function viewRole (){
    connection.query("SELECT * FROM role", function (err, res) {
        if (err) throw err;
        inquirer.prompt([
            {
                type: "list",
                name: "role",
                message: "Select role",
                choices: function () {
                    var the_choices = []
                    for (var i = 0; i < res.length; i++) {
                        the_choices.push(res[i].title)
                    }
                    return the_choices;
                }
            }
        ]).then(function (ans) {
            connection.query(`
                select e.*
                from role r
                inner join employee e
                on e.role_id = r.id
                where r.title = "${ans.role}"
                `, function (err, res) {
                    if (err) throw err;
                    console.log(res);
                    start();
                });
        });
    });
}

function viewEmployee (){
    query = `select
            e.id id, e.first_name first_name,
            e.last_name last_name, r.title title,
            d.name department, r.salary salary,
            CONCAT(e2.first_name, " ", e2.last_name) manager
            from employee e
            left join role r
            on e.role_id = r.id
            left join department d
            on r.department_id = d.id
            left join employee e2
            on e.manager_id = e2.id`
    connection.query( query, function(err,res){
        console.log(res);
        if (err) throw err; 
        start();
    });  
}

function viewData(query){
    connection.query( query, function(err,res){
        console.log(res);
        if (err) throw err; 
    });    
}

update_cust_id = 0;
update_employees = {};
update_roles = {};

function updateEmployeeRole (){
    connection.query("SELECT * FROM employee", function (err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            update_employees[`${res[i].first_name} ${res[i].last_name}`] = res[i].id;
        }
        inquirer.prompt([
            {
                type: "list",
                name: "employee",
                message: "Select employee",
                choices: function () {
                    var the_choices = []
                    for (var i = 0; i < res.length; i++) {
                        the_choices.push(`${res[i].first_name} ${res[i].last_name}`)
                    }
                    return the_choices;
                }
            }
        ]).then(function (ans) {
            update_cust_id = update_employees[ans.employee];
            connection.query("SELECT * FROM role", function (err, res) {
                if (err) throw err;
                for (var i = 0; i < res.length; i++) {
                    update_roles[res[i].title] = res[i].id;
                }
                inquirer.prompt([
                    {
                        type: "list",
                        name: "role",
                        message: "Select new role",
                        choices: function () {
                            var the_choices = []
                            for (var i = 0; i < res.length; i++) {
                                the_choices.push(res[i].title)
                            }
                            return the_choices;
                        }
                    }
                ]).then(function (ans) {
                    connection.query(`
                    UPDATE employee
                    SET role_id = ${update_roles[ans.role]}
                    WHERE id = ${update_cust_id};
                        `, function (err, res) {
                            if (err) throw err;
                            console.log(`Role updated!`);
                            start();
                    });
                });
            });
        });
    });

}
