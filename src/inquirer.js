// Inquirer Questions
const inquirer = require("inquirer");
const queries = require("../utils/queries");

let empArr = ["emp", "arr"]
// queries.empArr()

// Starting Questions
const mainMenu = [
    {
        type: "list",
        name: "mainMenu",
        message: "Select one from the list below:",
        choices: ["Show Employees", "Show All Departments", "Show All Roles", new inquirer.Separator(), "Add New Employee", "Add New Department", "Add New Role", new inquirer.Separator(), "Update Employee Role", new inquirer.Separator()]
    }
]

// Show Employees
const empOrderBy = [
    {
        type: "list",
        name: "selectCol",
        message: "How would you like the employee list displayed?",
        choices: ["ID", "First Name", "Last Name", "Role", "Assigned Manager"]
    },
    {
        type: "list",
        name: "orderType",
        message: "How would you like the list ordered?",
        choices: ["Ascending", "Descending"]
    }
]

// Show Departments

// Show Roles

// Add New Employee
const addEmp = [
    {
        type: "input",
        name:"firstName",
        message:"What is the first name of the employee you wish to add?",
        validate: firstNameValidate => {
            if(!firstNameValidate || typeof firstNameValidate !== "string") {
                return "Please provide the employee's first name."
            } else {
                return true
            }
        }
    },
    {
        type: "input",
        name:"lastName",
        message:"What is the last name of the employee you wish to add?",
        validate: lastNameValidate => {
            if(!lastNameValidate || typeof lastNameValidate !== "string") {
                return "Please provide the employee's last name."
            } else {
                return true
            }
        }
    },
    {
        type: "list",
        name: "roleType",
        message: "What is the employees role?",
        // CREATE GET ROLES FUNCTION!!!!
        choices: ["List", "Will", "Be", "Here"] /*`${getRoles()}`,*/
    },
    {
        type: "list",
        name: "empManager",
        messasge: "Who is the employee's manager?",
        choices: empArr
    }
]

// Add New Department
const addDept = [
    {
        type: "input",
        name: "deptName",
        message: "What is the new Department name?",
        validate: deptNameValidate => {
            if(!deptNameValidate || typeof deptNameValidate !== "string") {
                return "Please provide the new department name."
            } else {
                return true
            }
        }
    }
]

// Add New Role
const addRole = [
    {
        type: "input",
        name: "roleName",
        message: "What is the name of the new role?",
        validate: deptNameValidate => {
            if(!deptNameValidate || typeof deptNameValidate !== "string") {
                return "Please provide the new department name."
            } else {
                return true
            }
        }
    },
    {
        type: "input",
        name: "roleSalary",
        message: `What is the salary for this role?`,
        validate: roleSalaryValidate => {
            if(!roleSalaryValidate || typeof roleSalaryValidate !== "number") {
                return "Please provide the salary for the role."
            } else {
                return true
            }
        }
    }, 
    {
        type: "list",
        name: "roleDept",
        message: `Which department does this role belong to?`,
        validate: roleDeptValidate => {
            if(!roleDeptValidate || typeof roleDeptValidate !== "number") {
                return "Please provide the department for the role."
            } else {
                return true
            }
        }
    }
]

// Update Employee Role
const updateEmp = [
    {
        type: "list",
        name:"selectEmp",
        message:"Which employee do you wish to update?",
        choices: empArr

    },
    {
        type:"list",
        name:"updateOptions",
        message: "What do you want to update?",
        list: ["Name", "Role", "Manager"]
    },
    {
        type: "input",
        name:"updateFirstName",
        message:"What is the first name of the employee you wish to add?",
        validate: firstNameValidate => {
            if(!firstNameValidate || typeof firstNameValidate !== "string") {
                return "Please provide the employee's first name."
            }
        }
    },
]

module.exports = { empOrderBy, mainMenu, addEmp, addDept, addRole, updateEmp };