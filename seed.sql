DROP DATABASE IF EXISTS trackerdb;

CREATE DATABASE trackerdb;

USE trackerdb;

CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT,
  employeename VARCHAR(30) NULL,
  PRIMARY KEY (id)
);

CREATE TABLE role (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(30) NULL,
  salary DECIMAL (10,2) NULL,
  department_id INT () NULL,
  PRIMARY KEY (id)
  );

  CREATE TABLE employee (
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30) NULL,
  last_name VARCHAR(30) NULL,
  role_id INT() NULL,
  manager_id INT() NULL,
  PRIMARY KEY (id)
  );

