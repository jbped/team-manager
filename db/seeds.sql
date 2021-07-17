INSERT INTO department (dept_name)
VALUES 
("Product/Dev"),
("Marketing"),
("Legal"),
("Human Resources"),
("Sales");

INSERT INTO role (title, salary, department_id)
VALUES
("Sales Lead", 100000, 5),
("Sales Representative", 75000, 5),
("Sales Manager", 175000, 5),
("Dev Manager", 175000, 1),
("Senior Developer", 130000,1),
("Junior Developer", 100000, 1),
("Product Manager", 125000, 1),
("Social Media Specialist", 75000, 2),
("Market Analyst", 115000, 2),
("Maketing Manager", 175000, 2),
("Legal Counsel", 200000, 3),
("Legal Manager", 250000, 3),
("HR Manager", 150000, 4),
("HR Specialist", 95000,4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
("Fred", "Jones", 3, null),
("Daphne", "Blake", 2, 1),
("Scrappy", "Doo", 1, 1),
("Velma", "Dinkley", 4, null),
("Scooby", "Doo", 5, 4),
("Shaggy", "Rogers", 6, 4),
("Donnie", "Thornberry", 7, null),
("Nigel", "Thornberry", 10, null),
("Daffy", "Duck", 8, 7),
("Pepe", "Le Pew", 9, 7),
("Bugs", "Bunny", 12, null),
("Porky", "Pig", 11, 11),
("Road", "Runner", 13, null),
("Wile E.", "Coyote", 14, 13);