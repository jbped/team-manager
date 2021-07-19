//REQUIRE
const db = require("../db/connection");
const table = require('console.table');


// ======================================================================
// GET ROLES
// ======================================================================
const getRoles = () => {
    return new Promise (function(resolve, reject) {
        const sql = `SELECT r.id AS "ID", r.title AS Role, r.salary AS Salary, d.dept_name AS Department FROM role r
        JOIN department d ON r.department_id = d.id
        ORDER BY d.dept_name, r.title;`
        db.query(sql, (err, rows) => {
            if (err) {
                reject({ error: err.messsage });
                return;
            }
            resolve(rows)
        });
    });
}

// ======================================================================
// ADD NEW ROLE
// ======================================================================
const addRole = newRole => {
    // console.log(newRole)
    return new Promise (function(resolve, reject) {
        const sql = `INSERT INTO role (title, salary, department_id) 
                        VALUES (?, ?, ?)`
        const params = [newRole.roleName, newRole.roleSalary, newRole.id]
        db.query(sql, params, (err, result) => {
            if (err) {
                reject({ error: err.message });
            } else {
                let successfulAdd =({
                    status: "success",
                    data: newRole
                })
                resolve(successfulAdd); 
            }
        })
    })
}

// ======================================================================
// GET ROLE ID
// ======================================================================
const getRoleId = data => {
    return new Promise (function(resolve, reject) {
        const sql = `SELECT id FROM role WHERE title = ?;`
        params = [data.roleType]
        // console.log(data)
        db.query(sql, params, (err, result) => {
            if (err) {
                reject({ error: err.messsage });
            }
            data.roleId = result[0].id
            resolve(data)
        })
    })
}

module.exports = { getRoles, addRole, getRoleId }