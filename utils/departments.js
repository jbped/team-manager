// ======================================================================
// REQUIRED NPMS
// ======================================================================
const db = require("../db/connection");
const table = require('console.table');

// ======================================================================
// GET DEPARTMENTS
// ======================================================================
const getDept = () => {
    return new Promise (function(resolve, reject) {
        const sql = `SELECT dept_name AS Department FROM department ORDER BY dept_name ASC;`
        db.query(sql, (err, rows) => {
            if (err) {
                console.log ({ error: err.messsage });
            }
            resolve(rows)
        })
    })
}

// ======================================================================
// ADD NEW DEPARTMENT
// ======================================================================
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

// ======================================================================
// GET DEPARTMENT ID BY DEPT NAME
// ======================================================================
const getDeptId = data => {
    return new Promise (function(resolve, reject) {
        const sql = `SELECT id FROM department WHERE dept_name = ?;`
        params = [data.deptName]
        db.query(sql, params, (err, result) => {
            if (err) {
                console.log ({ error: err.messsage });
            }
            data.id = result[0].id
            resolve(data)
        })
    })
}

module.exports = { getDept, addDept, getDeptId }