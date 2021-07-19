const inquirer = require("inquirer");
const table = require('console.table');
const q = require("../src/inquirer");
const r = require("../utils/roles");
const d = require("../utils/departments");
const e = require("../utils/employees")
const { inqList } = require("../utils/lists");
const { empTable, roleTable, deptTable } = require("../src/tableNames");


// ======================================================================
// LOGIC FOR DISPLAYING DIFFERENT TABLES
// ======================================================================
function showEmployees() {
    return new Promise (function(resolve, reject) {
        inquirer.prompt(q.empOrderBy).then(order => e.getEmpsOrdered(order)).then(results => {
            resolve(console.table(empTable),
            console.table(results))
        })
    })
}

function showDepartments() {
    return new Promise (function(resolve, reject) {
        d.getDept().then(results => {
            resolve(console.table(deptTable),
            console.table(results))
        })
    })
}

function showRoles() {
    return new Promise (function(resolve, reject) {
        r.getRoles().then(results => {
            resolve(console.table(roleTable),
            console.table(results))
        })
    })
}

// ======================================================================
// LOGIC FOR ADDING NEW EMPS, ROLES, DEPARTMENTS
// ======================================================================
function newEmployee() {
    return new Promise (function(resolve, reject) {
        inqList().then((resultsArr) => {
            resultsArr[0].push("No Manager");
            q.addEmp[2].choices = resultsArr[1];
            q.addEmp[3].choices = resultsArr[0];

            return q.addEmp
        })
        .then(addEmp => {
            return inquirer.prompt(addEmp)
        })
        .then(data => {
            return r.getRoleId(data) 
        })
        .then(data => {
            console.log(data)
            if (data.empManager === "No Manager") {
                data.empManager = null;
                return e.addEmp(data)
                .then(data => {
                    resolve(console.log("\n" + data.data.firstName + " " + data.data.lastName + " has been added as a new employee!" + "\n"));
                })
                .catch(err => {
                    reject(err);
                });
            } else {
                let managerName = data.empManager.split(" ");
                return e.getEmpId(managerName)
                .then(id => {
                    data.managerId = id.data;
                    return e.addEmp(data)
                })
                .then(data => {
                    resolve(console.log("\n" + data.data.firstName + " " + data.data.lastName + " has been added as a new employee!" + "\n"));
                    
                })
                .catch(err => {
                    reject(err);
                    
                });
            }
        })
    })
}

function newDepartment() {
    return new Promise (function(resolve, reject) {
        inquirer.prompt(q.addDept)
        .then(newDept => {
            return d.addDept(newDept)
        })
        .then(data => {
            resolve(console.log("\n" + data.data.deptName + " has been added as a department!"+ "\n"));
        })
        .catch(err => {
            reject(err);
        });
    });
}

function newRole() {
    return new Promise (function(resolve, reject) {
        inqList().then((resultsArr) => {
            // console.log(resultsArr)
            q.addRole[2].choices = resultsArr[2];

            return q.addRole
        })
        .then(addRole => {
            return inquirer.prompt(addRole)
        })
        .then(data => {
            // console.log(data)
            return d.getDeptId(data);
        }).then(data => {
            return r.addRole(data)
        })
        .then(data => {
            resolve(console.log("\n" + data.data.roleName + " has been added as a role!" + "\n"));
        })
        .catch(err => {
            reject(err)
        });
    });   
}

// ======================================================================
// LOGIC FOR UPDATING EMPS
// ======================================================================
function updateEmployee() {
    return new Promise (function(resolve, reject) {
        inqList().then((resultsArr) => {
            q.updateEmp[0].choices = resultsArr[0];
            q.updateEmp[4].choices = resultsArr[1];
            q.updateEmp[5].choices = resultsArr[0];

            return q.updateEmp
        })
        .then(updateEmp => {
            return inquirer.prompt(updateEmp)
        })
        .then(data => {
            let empName = data.selectEmp.split(" ");
            return e.getEmpId(empName).then(id => {
                data.empId = id.data;
                return data
            })
        })
        .then(data => {
            if (data.updateOptions === "Name") {
                return e.updateEmpName(data)
                .then(data => {
                    resolve(console.log("\n" + data.data.selectEmp + "'s name has been updated to " + data.data.updateFirstName + " " + data.data.updateLastName + "\n"));
                    startApp()
                })
                .catch(err => {
                   reject(err)
                });
            } else if (data.updateOptions === "Role"){
                return r.getRoleId(data)
                .then(newData => {
                    return e.updateEmpRole(newData)
                })
                .then(data => {
                    resolve(console.log("\n" + data.data.selectEmp + "'s role has been updated to " + data.data.roleType+ "\n"));
                })
                .catch(err => {
                    reject(err)
                });
            } else if (data.updateOptions === "Manager"){
                let managerName = data.updateManager.split(" ");
                return e.getEmpId(managerName)
                .then(id => {
                    data.managerId = id.data
                    console.log("afterupdate", data)
                    return e.updateEmpManager(data) 
                })
                .then(data => {
                    resolve(console.log("\n" + data.data.selectEmp + "'s manager has been updated to " + data.data.updateManager + "\n"));
                })
                .catch(err => {
                    reject(err);
                });
            }
        })
    });   
}
// function temp() {
//     return new Promise (function(resolve, reject) {
//     });   
// }

module.exports = { showEmployees, showDepartments, showRoles, newEmployee, newDepartment, newRole, updateEmployee }