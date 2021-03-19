const mysql = require('mysql');
const inquirer = require('inquirer');
const consoleTable = require('console.table');
const { ETXTBSY } = require('node:constants');


const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    // your password goes here
    password:'',
    database: 'employees_db'
});


connection.connect((err)=>{
    if (err) throw err;
    console.log(`connected as id ${connection.threadId}\n`);
    employeeTracker();
})

const employeeTracker = () => {
    inquirer
    .prompt({
        name: 'action',
        type: 'rawlist',
        message: 'Select what you would like to do:',
        choices: [
            'Add Department',
            'Add Role',
            'Add Employee',
            'View all Employees',
            'View all Employees by Department',
            'View all Employees by Role',
            'Update Employee Role',
            // 'Remove Employee',
            
            // 'Update Employee Manager',
          
            // 'Remove Role',
        ],
    })
    .then((answer) => {
        switch (answer.action) {
            case 'Add Department':
            addDepartment();
            break;

            case 'Add Role':
            addRole();
            break;

            case 'Add Employee':
            addEmployee();
            break;

            case 'View all Employees':
            employeeSearch();
            break;

            case 'View all Employees by Department':
            deptSearch();
            break;

            case 'View all Employees by Role':
            roleSearch();
            break;

            case 'Update Employee Role':
            employeeUpdate();
            break;
                
        }
    })
}


function addDepartment(){
    inquirer.prompt([{
        name: 'name',
        type: 'input',
        message: 'What department would you like to add?'
    }]).then((res)=>{
        connection.query("INSERT INTO department SET ?"), {
            name: res.name
        }, (err) => {
            if(err) throw err;
            employeeTracker()
        }
    })
}

function addRole(){
    inquirer.prompt([{
        name: 'title',
        type: 'input',
        message: 'What is the title of the role you wold like to add?'
    },
    {
        name: 'salary',
        type: 'input',
        message: 'What is the salary of this role?'  
    }
]).then((res)=>{
        connection.query("INSERT INTO role SET ?"), {
            title: res.title,
            salary: res.salary
        }, (err) => {
            if(err) throw err;
            employeeTracker()
        }
    })
}

function addEmployee(){
    inquirer.prompt([{
        name: 'firstName',
        type: 'input',
        message: 'What is the first name of this employee?'
    },
    {
        name: 'lastName',
        type: 'input',
        message: 'What is the last name of this employee?'  
    },
    {
        name: 'role',
        type: 'list',
        message: 'What is the role of this employee?',  
        choices: rolePick()
    },
    {
        name: 'manager',
        type: 'list',
        message: 'Who is the manager of this employee?',  
        choices: managerPick()
    }
]).then((res)=>{
    const roleID = rolePick().indexOf(res.role) + 1;
    const managerID = rolePick().indexOf(res.manager) + 1;
        connection.query("INSERT INTO employee SET ?"), {
            first_name: res.firstName,
            last_name: res.lastName,
            role_id: roleID,
            manager_id: managerID
        }, (err) => {
            if(err) throw err;
            employeeTracker()
        }
    })
}

const roleArray = []
function rolePick(){
    connection.query("SELECT * FROM role", (err, res)=>{
        if (err) throw err;
        for (i=0; i<res.length; i++) {
            roleArray.push(res[i].title);
        }
    })
    return roleArray

}

const managerArray = []
function managerPick(){
    connection.query("SELECT * FROM role", (err, res)=>{
        if (err) throw err;
        for (i=0; i<res.length; i++) {
            managerArray.push(res[i].first_name);
        }
    })
    return managerArray

}

function employeeSearch(){
    connection.query('SELECT employees.first_name, employees.last_name, roles.title, roles.salary, departments.name, CONCAT(e.first_name, " ", e.last_name) AS manager FROM employees INNER JOIN roles ON roles.id = employees.role_id INNER JOIN departments ON departments.id = roles.department_id LEFT JOIN employees e ON employees.manager_id = e.id', (err, res)=>{
        if (err) throw err;
            employeeTracker()
    })
}

function deptSearch(){
    connection.query('SELECT employees.first_name, employees.last_name, roles.title, roles.salary, departments.name AS departments FROM employees JOIN roles ON roles.id = employees.role_id JOIN departments ON departments.id = roles.department_id ORDER BY employee.id', (err, res)=>{
        if (err) throw err;
            employeeTracker()
    })
}

function roleSearch(){
    connection.query('SELECT employees.first_name, employees.last_name, roles.title, AS title FROM employees JOIN roles ON roles.id = employees.role_id', (err, res)=>{
        if (err) throw err;
            employeeTracker()
    })
}