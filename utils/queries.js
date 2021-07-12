//REQUIRE
const db = require("../db/connection");
const table = require('console.table');


const empArr = () => {
    sql = `SELECT CONCAT(e.first_name, " ", e.last_name)
        FROM employee e
        ORDER BY e.first_name ASC;`
    db.query(sql, (err, results) => {
        if (err) {
            console.log({ error: err.message })
        }
        return results
    })
}

// Show Emps
const getEmps = () => {
    sql = `SELECT e.id, e.first_name, e.last_name, r.title AS role, CONCAT(m.first_Name, " ", m.last_name) AS manager_name 
    FROM employee e
    JOIN role r ON e.role_id = r.id
    INNER JOIN employee m ON e.manager_id = m.id;`
    db.query(sql, (err, result) => {
        if (err) {
            console.log({ error: err.message })
        }
        return result
    })
}


const getEmpsOrdered = order => {
    let colLiteral = ""
    let orderBy = order.orderType

    switch (order.selectCol) {
        case "ID":
            colLiteral = "id"
            console.log(colLiteral);
            break;
        case "First Name":
            colLiteral = "first_name"
            console.log(colLiteral);
            break;
        case "Last Name":
            colLiteral = "last_name"
            console.log(colLiteral);
            break;
        case "Role":
            colLiteral = "role_id"
            console.log(colLiteral);
            break;
        case "Assigned Manager":
            colLiteral = "manager_id"
            console.log(colLiteral);
            break;
    }

    switch (order.orderType) {
        case "Ascending":
            orderBy = "ASC"
            break;
        case "Descending":
            orderBy = "DESC"
            break;
    }

    sql=`SELECT 
    e.id AS "ID", e.first_name AS "First Name", e.last_name AS "Last Name", r.title AS "Position", CONCAT(m.first_Name, " ", m.last_name) AS "Manager"
    FROM employee e
    JOIN role r ON e.role_id = r.id
    INNER JOIN employee m ON e.manager_id = m.id
    ORDER BY e.${colLiteral} ${orderBy};`

    db.query(sql, (err, result) => {
        if (err) {
            console.log({ error: err.message })
        }
        console.table(result)
    })
}

// Show Departments
const getDept = () => {
    const sql = `SELECT dept_name AS Department FROM department ORDER BY dept_name ASC;`
    db.query(sql, (err, rows) => {
        if (err) {
            console.log ({ error: err.messsage });
        }
        console.table(rows)
    })
}

// Show Roles
const getRoles = () => {
    const sql = `SELECT r.title AS Role, r.salary AS Salary, d.dept_name AS Department FROM role r
    JOIN department d ON r.department_id = d.id
    ORDER BY d.dept_name, r.title;`
    db.query(sql, (err, rows) => {
        if (err) {
            console.log ({ error: err.messsage });
        }
        console.table(rows)
    })
}

// Add New Employee
const addEmp = newEmp => {
    console.log(newEmp)
    const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) 
                    VALUES (?,?,?,?)`
    const params = [newEmp.firstName, newEmp.lastName, newEmp.roleType, newEmp.empManager]
    db.query(sql, params, (err, result) => {
        if (err) {
            console.log({ error: err.message })
        } else {
            console.log({
                status: "success",
                data: newEmp
            })
        }
    })
}

// Add New Department
const addDept = newDept => {
    console.log(newDept)
    const sql = `INSERT INTO department (dept_name) 
                    VALUES (?)`
    const params = [newDept.deptName]
    db.query(sql, params, (err, result) => {
        if (err) {
            console.log({ error: err.message })
        } else {
            console.log({
                status: "success",
                data: newDept
            })
        }
    })
}

// Add New Role
const addRole = newRole => {
    console.log(newRole)
    const sql = `INSERT INTO department (role_name) 
                    VALUES (?)`
    const params = [newRole.roleName]
    db.query(sql, params, (err, result) => {
        if (err) {
            console.log({ error: err.message })
        } else {
            console.log({
                status: "success",
                data: newRole
            })
        }
    })
}
// Update Employee

module.exports = { getEmps, empArr, getEmpsOrdered, getDept, getRoles, addEmp, addDept, addRole }