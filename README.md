# Team Manager
![MIT License badge](https://img.shields.io/badge/license-MIT_License-green)
## Description
Team Manager is a CLI application that allows the user to manage the employees, roles, salaries, and departments of their company. It offers the ability to view al employees, roles, departments, and add new ones as well. This simple tool can provide assistance in managing small and large groups of employees.

![Team Manager](https://user-images.githubusercontent.com/76881086/126098667-88518c88-df2c-4578-bd44-2e6952637d05.png)

## Table of Contents
* [Installation](#installation)
* [Usage](#usage)
* [License](#license)
* [Credits](#credits)
* [Contributions](#contributions)
* [Questions](#questions)

## Installation
1. Ensure that you are able to create a new SQL Database (I used [MySQL Server](https://dev.mysql.com/downloads/mysql/)) 
2. Clone repository 
3. Open a new command line that is in the correct directory 
4. Run `npm i `
5. Navigate to the ".env EXAMPLE" file 
6. Edit the DB_USER and DB_PASS values to match your SQL Server credentials. 
7. Rename the ".env EXAMPLE" file to ".env"
8. Return to your open command line, load the schema.sql to create the appropriate database and tables.
    * In MySQL this can be done by:
    * `mysql -u {user} -p`
    * Enter your MySQL password
    * `source ./db/schema.sql;`
    * If you wish to populate the application with test employees you can do so by using: `source .db/seeds.sql;`
9. The application can now be used.

## Usage
Once the application has been installed, open a new command line within the repository's directory, enter the command `node index`. Team Manager is now running. Use your arrow buttons to navigate the main menu and press enter once you have found the option you want to use. When you no longer wish to use the program use the "EXIT APPLICATION" option. Team Manager will then close.

Here is a detailed walkthrough in the usage of the [Team Manager CLI Application](https://drive.google.com/file/d/1wm7T9etob-5uMUvtzDI2wgjU7kpxD_Uf/view)

## License

MIT License

Copyright &copy; 2021 Jake Pedigo

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

## Credits
### Assets
* [Node.js](https://nodejs.org/en/)
* [Inquirer npm](https://www.npmjs.com/package/inquirer)

## Contributions
Contributions to this project follow the Contributor Covenant [additional information can be found here](https://www.contributor-covenant.org/version/2/0/code_of_conduct/).

## Questions
For any inquiries regarding Team Manager, please contact Jake Pedigo:
* GitHub: [jbped](https://github.com/jbped)
* Email: <pedigojacob@gmail.com>
