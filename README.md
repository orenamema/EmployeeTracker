# EmployeeTracker - MySQL

## Introduction

In this project I've created a Content Management System that allows the user to track employees easily.This application is ideal for a manager that wants to view and manage the different departments, roles and employees in the company. This will allow the manager to plan its work and projects.

I've created a schema database containing three tables:
* Department
* Role
* Employee

## Technology Used
* [MySQL](https://www.npmjs.com/package/mysql)
* [InquirerJs](https://www.npmjs.com/package/inquirer/v/0.2.3)
* [console.table](https://www.npmjs.com/package/console.table)
* [Nodejs](https://nodejs.org/en/)

## Application

![alt text](https://github.com/orenamema/EmployeeTracker/raw/master/assets/images/tracker.gif)

In order to take notes with this application, the user needs to follow the steps:

* Navigate to EmployeeTracker in the terminal
* Then the app with the command `node app.js`
* Then add, view or update the database

## Requirements

Following are the minimum requirements that the command line application does:
  * Add departments, roles, employees
  * View departments, roles, employees
  * Update employee roles

## Code

```
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
                    console.table(res);
                    start();
                });
        });
    });
}
```
I believe this is an interesting part of my code that highlights how I was able to use different functions to allow the user to view the employees by departments by joining the different tables.

## Learning Points
I have learned a lot while building this application especially joining SQL tables.

## Author

**Oren Amema**

* [Github](https://github.com/orenamema)
* [LinkedIn](https://www.linkedin.com/in/oren-amematekpo-b7a12b13)
* [Portfolio](https://orenamema.github.io/UpdatedPortfolio/)
