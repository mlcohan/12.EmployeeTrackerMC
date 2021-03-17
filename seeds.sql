USE employee_db;

-- insert data into departments 
INSERT INTO departments (id, name)
VALUES (1, "Math");

INSERT INTO departments (id, name)
VALUES (2, "Science");

INSERT INTO departments (id, name)
VALUES (3, "English");

INSERT INTO departments (id, name)
VALUES (4, "History");


-- insert data into role
-- math dept
INSERT INTO role (id, title, salary, department_id)
VALUES (1, "Assistant Teacher", 30000, 1)

INSERT INTO role (id, title, salary, department_id)
VALUES (2, "Algebra Teacher", 44000, 1)

INSERT INTO role (id, title, salary, department_id)
VALUES (3, "Math Admin", 60000, 1)

--science dept

INSERT INTO role (id, title, salary, department_id)
VALUES (4, "Biology Teacher", 41000, 2)

INSERT INTO role (id, title, salary, department_id)
VALUES (5, "Science Admin", 65000, 2)

--English dept

INSERT INTO role (id, title, salary, department_id)
VALUES (6, "Intro to Lit Teacher", 43000, 3)

INSERT INTO role (id, title, salary, department_id)
VALUES (7, "English Admin", 43000, 3)

--History dept
INSERT INTO role (id, title, salary, department_id)
VALUES (8, "World History Teacher", 42000, 4)

INSERT INTO role (id, title, salary, department_id)
VALUES (9, "History Admin", 63000, 4)



--insert data into employees
INSERT INTO employees (id, first_name, last_name, role_id, manager_id)
VALUES (1, "Kim", "Sample", 3, null)

INSERT INTO employees (id, first_name, last_name, role_id, manager_id)
VALUES (2, "Meade", "Jones", 5, null)

INSERT INTO employees (id, first_name, last_name, role_id, manager_id)
VALUES (3, "Adam", "Young", 7, null)

INSERT INTO employees (id, first_name, last_name, role_id, manager_id)
VALUES (4, "Aleks", "Snyder", 9, null)

INSERT INTO employees (id, first_name, last_name, role_id, manager_id)
VALUES (5, "George", "Lamy", 1, 6)

INSERT INTO employees (id, first_name, last_name, role_id, manager_id)
VALUES (6, "Mary", "Lessig", 2, 1)

INSERT INTO employees (id, first_name, last_name, role_id, manager_id)
VALUES (7, "Sarah", "Finley", 4, 2)

INSERT INTO employees (id, first_name, last_name, role_id, manager_id)
VALUES (8, "Al", "Kaiser", 6, 4)

INSERT INTO employees (id, first_name, last_name, role_id, manager_id)
VALUES (9, "Elizabeth", "Washington", 8, 4)

INSERT INTO employees (id, first_name, last_name, role_id, manager_id)
VALUES (10, "Shakita", "Barnes", 8, 4)