const inquirer = require("inquirer");
const table = require('console.table');

const q = require("./src/inquirer");
const r = require("./utils/roles");
const d = require("./utils/departments");
const e = require("./utils/employees")
const { inqList } = require("./utils/lists");


const menuLogic = ({ mainMenu }) => {
    switch(mainMenu){
        case "Show Employees": 
            inquirer.prompt(q.empOrderBy).then(order => e.getEmpsOrdered(order))
            break;
        case "Show All Departments":
            d.getDept();
            break;
        case "Show All Roles":
            r.getRoles();
            break;
        case "Add New Employee":
            inquirer.prompt(q.addEmp).then(newEmp => queries.addEmp(newEmp));
            break;
        case "Add New Department":
            inquirer.prompt(q.addDept).then(newDept => queries.addDept(newDept));
            break;
        case "Add New Role":
            inquirer.prompt(q.addRole).then(newRole => queries.addRole(newRole));
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
    }
}

const startApp = () => {
    inquirer.prompt (q.mainMenu)
    .then(answers => {
        return menuLogic(answers);
    })
}

startApp();
