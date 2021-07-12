const inquirer = require("inquirer");
const table = require('console.table');

const q = require("./src/inquirer");
const queries = require("./utils/queries");

const menuLogic = ({ mainMenu }) => {
    // Show Employees
    switch(mainMenu){
        case "Show Employees": 
            inquirer.prompt(q.empOrderBy).then(order => queries.getEmpsOrdered(order))
            break;
        case "Show All Departments":
            queries.getDept();
            break;
        case "Show All Roles":
            queries.getRoles();
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
            inquirer.prompt(q.updateEmp).then(newInfo => console.log(newInfo));
            break;
    }
    // if (mainMenu === "Show Employees") {
    //     return inquirer.prompt(q.empOrderBy).then(order => queries.getEmpsOrdered(order));
    // } 
    // // 
    // else if (mainMenu === "Show All Departments") {
    //     return queries.getDept();
    // } 
    // else if (mainMenu === "Show All Roles") {
    //     return queries.getRoles();
    // } 
    // else if (mainMenu === "Add New Employee") {
    //     console.log("Add New Employee");
    //     return inquirer.prompt(q.addEmp).then(newEmp => queries.addEmp(newEmp));
    // } 
    // else if (mainMenu === "Add New Department") {
    //     console.log("Add New Department");
    //     return inquirer.prompt(q.addDept).then(newDept => queries.addDept(newDept));
    // } 
    // else if (mainMenu === "Add New Role") {
    //     console.log("Add New Role");
    //     return inquirer.prompt(q.addRole).then(newRole => queries.addRole(newRole));
    // } 
    // else if (mainMenu === "Update Employee Role") {
    //     console.log("Update Employee Role");
    //     return inquirer.prompt(q.updateEmp).then(newInfo => console.log(newInfo));
    // }
}

const startApp = () => {
    inquirer.prompt (q.mainMenu)
    .then(answers => {
        // console.log(answers);
        return menuLogic(answers);
    })
}

startApp();