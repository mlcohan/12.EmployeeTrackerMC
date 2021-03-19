DROP DATABASE IF EXISTS employee_db
CREATE DATABASE employee_db
USE employee_db

CREATE TABLE departments(
    id INT AUTO_INCEREMENT NOT NULL,
    name VARCHAR(30),
    PRIMARY KEY (id)
);

CREATE TABLE roles(
    id INT AUTO_INCEREMENT NOT NULL,
    title VARCHAR(30),
    salary DECIMAL,
    department_id INT
    PRIMARY KEY (id)
    FOREIGN KEY (department_id) REFERENCES departments(id)
);

CREATE TABLE employees(
    id INT AUTO_INCEREMENT NOT NULL,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT
    manager_id INT
    PRIMARY KEY (id)
    FOREIGN KEY (role_id) REFERENCES roles(id)
    FOREIGN KEY (manager_id) REFERENCES employees(id)
);

SELECT * FROM departments;
SELECT * FROM roles;
SELECT * FROM employees;

-- supposed to use JOIN
SELECT name, title, salary
FROM roles
INNER JOIN departments ON roles.department_id = departments.id

SELECT name, title, salary
FROM roles
INNER JOIN departments ON roles.department_id = departments.id