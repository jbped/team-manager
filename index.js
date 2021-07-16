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

const menuLogic = ({ mainMenu }) => {
    switch(mainMenu){
        case "Show Employees": 
            inquirer.prompt(q.empOrderBy).then(order => e.getEmpsOrdered(order)).then(results => {
                console.log(empTable)
                console.table(results)
                startApp()
            })
            break;
        case "Show All Departments":
            d.getDept().then(results => {
                console.log(deptTable)
                console.table(results)
                startApp()
            });
            break;
        case "Show All Roles":
            r.getRoles().then(results => {
                console.log(roleTable)
                console.table(results)
                startApp()
            });
            break;
        case "Add New Employee":
            inqList().then((resultsArr) => {
                q.addEmp[2].choices = resultsArr[1];
                q.addEmp[3].choices = resultsArr[0];

                return q.addEmp
            })
            .then(addEmp => {
                return inquirer.prompt(addEmp)
            })
            .then(data => {
                console.log(data)
            })
            break;
        case "Add New Department":
            inquirer.prompt(q.addDept).then(newDept => d.addDept(newDept));
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
                console.log(data.roleName + " has been added as a role!")
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
        case "Update Employee Role":
            quitApp();
            break;
    }
}

const startApp = () => {
    inquirer.prompt (q.mainMenu)
    .then(answers => {
        return menuLogic(answers);
    })
}

const quitApp = () => {
    // console.log("Goodbye!");
    process.exit();
}

startApp();
