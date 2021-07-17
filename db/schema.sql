DROP DATABASE IF EXISTS team_manager;
CREATE DATABASE team_manager;
USE team_manager;

DROP TABLE IF EXISTS employee; 
DROP TABLE IF EXISTS role;
DROP TABLE IF EXISTS department;

CREATE TABLE department (
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    dept_name VARCHAR(40) NOT NULL,
    UNIQUE (dept_name)
);

CREATE TABLE role (
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    title VARCHAR(30) NOT NULL, 
    salary DECIMAL(9,2) NOT NULL,
    department_id INT,
    CONSTRAINT fk_department FOREIGN KEY (department_id) REFERENCES department(id) ON DELETE SET NULL,
    UNIQUE (title)
);

CREATE TABLE employee (
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT,
    manager_id INT,
    CONSTRAINT fk_manager FOREIGN KEY (manager_id) REFERENCES employee(id) ON DELETE SET NULL
);