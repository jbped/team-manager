//REQUIRE
const db = require("../db/connection");
const table = require('console.table');


// Show Roles
const getRoles = () => {
    return new Promise (function(resolve, reject) {
        const sql = `SELECT r.title AS Role, r.salary AS Salary, d.dept_name AS Department FROM role r
        JOIN department d ON r.department_id = d.id
        ORDER BY d.dept_name, r.title;`
        db.query(sql, (err, rows) => {
            if (err) {
                console.log ({ error: err.messsage });
            }
            resolve(rows)
        });
    });
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


module.exports = { getRoles, addRole }