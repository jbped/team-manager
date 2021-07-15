const db = require("../db/connection");
const table = require('console.table');

function inqList() {
    return Promise.all (
        [
            empList(),
            roleList(),
            deptList()
        ]
    )
}
      
function empList() {
    return new Promise (function(resolve, reject) {
        let sql = `SELECT CONCAT(e.first_name, " ", e.last_name) AS name
                FROM employee e
                ORDER BY e.first_name ASC;`
        db.query(sql, (err, results) => {
            if (err) {
                console.log({ error: err.message })
                return reject(err);
            }
            let resultsArr = []
            for (let i = 0; i < results.length; i++) {
                let convertedRow = results[i].name
                resultsArr.push(convertedRow)
            }
            // console.log(resultsArr)
            resolve(resultsArr)
        });
    })
}

function roleList() {
    return new Promise (function(resolve, reject) {
        const sql = `SELECT r.title AS role
        FROM role r
        ORDER BY r.department_id, r.title;`
        db.query(sql, (err, results) => {
            if (err) {
                console.log({ error: err.message })
                return reject(err);
            }
            let resultsArr = []
            for (let i = 0; i < results.length; i++) {
                let convertedRow = results[i].role
                resultsArr.push(convertedRow)
            }
            // console.log(resultsArr)
            resolve(resultsArr)
        });
    });
};

function deptList() {
    return new Promise (function(resolve, reject) {
        const sql = `SELECT dept_name AS department FROM department ORDER BY dept_name ASC`
        db.query(sql, (err, results) => {
            if (err) {
                console.log({ error: err.message })
                return reject(err);
            }
            // console.log(results)
            let resultsArr = []
            for (let i = 0; i < results.length; i++) {
                let convertedRow = results[i].department
                resultsArr.push(convertedRow)
            }
            // console.log(resultsArr)
            resolve(resultsArr)
        });
    });
};

module.exports = { inqList, empList, roleList, deptList }