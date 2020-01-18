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
var update_cust_id = 0;
var update_employees = {};
var update_roles = {};

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
```
I believe this is an interesting part of my code that highlights how I was able to use different functions to allow the user to update the data.

## Learning Points
I have learned a lot while building this application especially joining SQL tables.

## Author

**Oren Amema**

* [Github](https://github.com/orenamema)
* [LinkedIn](https://www.linkedin.com/in/oren-amematekpo-b7a12b13)
* [Portfolio](https://orenamema.github.io/UpdatedPortfolio/)
