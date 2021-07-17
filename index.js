// ======================================================================
// REQUIRED NPMS
// ======================================================================
const inquirer = require("inquirer");
const table = require('console.table');
const q = require("./src/inquirer");

// ======================================================================
// CUSTOM RESOURCES
// ======================================================================
const r = require("./utils/roles");
const d = require("./utils/departments");
const e = require("./utils/employees")
const { inqList } = require("./utils/lists");
const { empTable, roleTable, deptTable } = require("./src/tableNames");

// ======================================================================
// LOGIC FOR MAIN MENU SELECTIONS
// ======================================================================

const menuLogic = ({ mainMenu }) => {
    switch(mainMenu){
        case "Show Employees": 
            inquirer.prompt(q.empOrderBy).then(order => e.getEmpsOrdered(order)).then(results => {
                console.table(empTable)
                console.table(results)
                startApp()
            })
            break;
        case "Show All Departments":
            d.getDept().then(results => {
                console.table(deptTable)
                console.table(results)
                startApp()
            });
            break;
        case "Show All Roles":
            r.getRoles().then(results => {
                console.table(roleTable)
                console.table(results)
                startApp()
            });
            break;
        case "Add New Employee":
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
                if (data.empManager === "No Manager") {
                    data.empManager = null;
                    return e.addEmp(data)
                    .then(data => {
                        console.log(data.data.firstName + " " + data.data.lastName + " has been added as a new employee!");
                        startApp()
                    })
                    .catch(err => {
                        console.log("\nAn Error Occurred: ", err.error + "\n");
                        startApp()
                    });
                } else {
                    managerName = data.empManager.split(" ");
                    return e.getEmpId(managerName)
                    .then(id => {

                        data.managerId = id.data;
                        return e.addEmp(data)
                    })
                    .then(data => {
                        console.log(data.data.firstName + " " + data.data.lastName + " has been added as a new employee!");
                        startApp()
                    })
                    .catch(err => {
                        console.log("\nAn Error Occurred: ", err.error + "\n");
                        startApp()
                    });
                }
            })
            break;
        case "Add New Department":
            inquirer.prompt(q.addDept)
            .then(newDept => {
                return d.addDept(newDept)
            })
            .then(data => {
                console.log(data.data.deptName + " has been added as a department!");
                startApp()
            })
            .catch(err => {
                console.log("\nAn Error Occurred: ", err.error + "\n");
                startApp()
            });
            break;
        case "Add New Role":
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
                console.log(data.data.roleName + " has been added as a role!")
                startApp()
            })
            .catch(err => {
                console.log("\nAn Error Occurred: ", err.error + "\n");
                startApp()
            })
            break;
        case "Update Employee Role":
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
                console.log(data)
            })
            break;
        case "EXIT APPLICATION":
            quitApp();
            break;
    }
}

// ======================================================================
// START APPLICATION
// ======================================================================
const startApp = () => {
    inquirer.prompt (q.mainMenu)
    .then(answers => {
        return menuLogic(answers);
    })
}

// ======================================================================
// TERMINATE APPLICATION
// ======================================================================
const quitApp = () => {
    console.log("Goodbye!");
    process.exit();
}

startApp();
