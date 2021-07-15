//REQUIRE
const db = require("../db/connection");
const table = require('console.table');

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
                colLiteral = "id"
                break;
            case "First Name":
                colLiteral = "first_name"
                break;
            case "Last Name":
                colLiteral = "last_name"
                break;
            case "Role":
                colLiteral = "role_id"
                break;
            case "Assigned Manager":
                colLiteral = "manager_id"
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
        e.id AS "ID", e.first_name AS "First Name", e.last_name AS "Last Name", r.title AS "Position", CONCAT(m.first_Name, " ", m.last_name) AS "Manager"
        FROM employee e
        JOIN role r ON e.role_id = r.id
        LEFT JOIN employee m ON e.manager_id = m.id
        ORDER BY e.${colLiteral} ${orderBy};`
    
        db.query(sql, (err, result) => {
            if (err) {
                console.log({ error: err.message })
            }
            resolve(result)
        })
    })
}
// ======================================================================
// ADD NEW EMPLOYEE
// ======================================================================
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

// ======================================================================
// UPDATE EMPLOYEE
// ======================================================================

module.exports = { getEmpsOrdered, addEmp }