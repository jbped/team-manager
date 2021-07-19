//REQUIRE
const db = require("../db/connection");
const table = require('console.table');

const getEmps = () => {
    return new Promise (function(resolve, reject) {
        sql=`SELECT 
        e.id AS "ID", e.first_name AS "First Name", e.last_name AS "Last Name", d.dept_name AS Department, r.title AS "Position", r.salary AS Salary, CONCAT(m.first_Name, " ", m.last_name) AS "Manager"
        FROM employee e
        JOIN role r ON e.role_id = r.id
        JOIN department d ON r.department_id = d.id
        LEFT JOIN employee m ON e.manager_id = m.id
        ORDER BY e.first_name;`
    
        db.query(sql, (err, result) => {
            if (err) {
                reject({ error: err.message })
                return;
            }
            resolve(result)
        })
    })
}

// ======================================================================
// GET ORGANIZED EMPLOYEE LIST
// ======================================================================
// Ordered list of Employees, user has the ability to order ASC||DESC for id, first_name, last_name, role_id, manager_id
const getEmpsOrdered = order => {
    return new Promise (function(resolve, reject) {
        let colLiteral = ""
        let orderBy = order.orderType
    
        // Assign appropriate column name to colLiteral
        switch (order.selectCol) {
            case "ID":
                colLiteral = "e.id"
                break;
            case "First Name":
                colLiteral = "e.first_name"
                break;
            case "Last Name":
                colLiteral = "e.last_name"
                break;
            case "Department":
                colLiteral = "d.dept_name"
                break;
            case "Position":
                colLiteral = "r.title"
                break;
            case "Salary":
                colLiteral = "r.salary"
                break;
            case "Assigned Manager":
                colLiteral = "e.manager_id"
                break;
        }
    
        // Determine order type ASC||DESC
        switch (order.orderType) {
            case "Ascending":
                orderBy = "ASC"
                break;
            case "Descending":
                orderBy = "DESC"
                break;
        }
    
        sql=`SELECT 
        e.id AS "ID", e.first_name AS "First Name", e.last_name AS "Last Name", d.dept_name AS Department, r.title AS "Position", r.salary AS Salary, CONCAT(m.first_Name, " ", m.last_name) AS "Manager"
        FROM employee e
        JOIN role r ON e.role_id = r.id
        JOIN department d ON r.department_id = d.id
        LEFT JOIN employee m ON e.manager_id = m.id
        ORDER BY ${colLiteral} ${orderBy};`
    
        db.query(sql, (err, result) => {
            if (err) {
                reject({ error: err.message })
                return;
            }
            resolve(result)
        })
    })
}
// ======================================================================
// ADD NEW EMPLOYEE
// ======================================================================
const addEmp = newEmp => {
    return new Promise (function(resolve, reject) {
        const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) 
                        VALUES (?,?,?,?)`
        const params = [newEmp.firstName, newEmp.lastName, newEmp.roleId, newEmp.managerId]
        db.query(sql, params, (err, result) => {
            if (err) {
                reject({ error: err.message })
            } else {
                resolve({
                    status: "success",
                    data: newEmp
                })
            }
        })
    })
}

// ======================================================================
// GET EMP ID BY FIRST AND LAST NAME
// ======================================================================
const getEmpId = data => {
    return new Promise (function(resolve, reject) {
        const sql = `SELECT id FROM employee WHERE first_name = ? AND last_name = ?;`
        params = [data[0], data[data.length - 1]]
        db.query(sql, params, (err, result) => {
            if (err) {
                reject({ error: err.messsage });
                return;
            }
            data.empId = result[0].id
            let success = ({
                status: "success",
                data: data.empId
            })
            resolve(success)
        })
    })
}
// ======================================================================
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
// ~~~~~~~~~~~~~~~~~~~~~~~~~~ UPDATE EMPLOYEE ~~~~~~~~~~~~~~~~~~~~~~~~~~
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
// ======================================================================

// ======================================================================
// UPDATE EMPLOYEE NAME
// ======================================================================
const updateEmpName = data => {
    return new Promise (function(resolve, reject) {
        const sql = `UPDATE employee SET first_name = ?, last_name = ? WHERE id = ?;`
        params = [data.updateFirstName, data.updateLastName, data.empId]
        // console.log(data)
        db.query(sql, params, (err, result) => {
            if (err) {
                reject({ error: err.message});
                return;
            }
            let success = ({
                message:"success",
                data:data,
                changes:result.affectedRows
            })
            resolve(success)
        })
    })
}
// ======================================================================
// UPDATE EMPLOYEE ROLE
// ======================================================================
const updateEmpRole = data => {
    return new Promise (function(resolve, reject) {
        // console.log(data)
        const sql = `UPDATE employee SET role_id = ? WHERE id = ?;`
        params = [data.roleId, data.empId]
        // console.log(data)
        db.query(sql, params, (err, result) => {
            if (err) {
                reject({ error: err});
                return;
            }
            let success = ({
                message:"success",
                data:data,
                changes:result.affectedRows
            })
            resolve(success)
        })
    })
}
// ======================================================================
// UPDATE EMPLOYEE MANAGER
// ======================================================================
const updateEmpManager = data => {
    return new Promise (function(resolve, reject) {
        const sql = `UPDATE employee SET manager_id = ? WHERE id = ?;`
        params = [data.managerId, data.empId]
        db.query(sql, params, (err, result) => {
            if (err) {
                reject({ error: err.message});
                return;
            }
            let success = ({
                message:"success",
                data:data,
                changes:result.affectedRows
            })
            resolve(success)
        })
    })
}

module.exports = { getEmps, getEmpsOrdered, addEmp, getEmpId, updateEmpName, updateEmpRole, updateEmpManager }