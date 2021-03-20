const mysql = require('mysql');
const inquirer = require('inquirer');
const consoleTable = require('console.table');



const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    // your password goes here
    password:'1qaw3edr',
    database: 'employee_db'
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
            'View Employees',
            'View Departments',
            'View Roles',
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

            case 'View Employees':
            employeeSearch();
            break;

            case 'View Departments':
            deptSearch();
            break;

            case 'View Roles':
            roleSearch();
            break;

            case 'Update Employee Role':
            employeeUpdate();
            break;
                
        }
    })
}


const roleArray = []
function rolePick(){
    connection.query("SELECT * FROM roles", (err, res)=>{
        if (err) throw err;
        for (i=0; i<res.length; i++) {
            roleArray.push(res[i].title);
        }
    })
    return roleArray;

}

const managerArray = []
function managerPick(){
    connection.query("SELECT first_name, last_name FROM employees WHERE manager_id IS NULL", (err, res)=>{
        if (err) throw err;
        for (i=0; i<res.length; i++) {
            managerArray.push(res[i].first_name);
        }
    })
    return managerArray;

}

function addDepartment(){
    inquirer.prompt([{
        name: 'name',
        type: 'input',
        message: 'What department would you like to add?'
    }]).then((res)=>{
        connection.query("INSERT INTO departments SET ?", {
            name: res.name
        }, (err) => {
            if(err) throw err;
            console.table(res);
            employeeTracker()
        })
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
        connection.query("INSERT INTO roles SET ?", {
            title: res.title,
            salary: res.salary
        }, (err) => {
            if(err) throw err;
            console.table(res);
            employeeTracker()
        })
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
    const managerID = managerPick().indexOf(res.manager) + 1;
        connection.query("INSERT INTO employees SET ?", {
            first_name: res.firstName,
            last_name: res.lastName,
            role_id: roleID,
            manager_id: managerID
        }, (err) => {
            if(err) throw err;
            console.table(res);
            employeeTracker()
        })
    })
}


function employeeSearch(){
    connection.query("SELECT * FROM employees", (err, res) =>{
        console.table(res);
            employeeTracker()
    })
}

function deptSearch(){
    connection.query('SELECT * FROM departments', (err, res) =>{
        if (err) throw err;
        console.table(res);
        employeeTracker()
    })
}

function roleSearch(){
    connection.query('SELECT * FROM roles', (err, res) =>{
        if (err) throw err;
        console.table(res);
        employeeTracker()
    })
}

// function deptSearch(){
//     connection.query('SELECT employees.first_name, employees.last_name, departments.name AS departments FROM employees JOIN roles ON employees.role_id = roles.id JOIN departments ON roles.department_id = departments.id ORDER BY employees.id', (err, res)=>{
//         if (err) throw err;
//         console.table(res);
//             employeeTracker()
//     })
// }

// function roleSearch(){
//     connection.query('SELECT employees.first_name, employees.last_name, roles.title, AS title FROM employees JOIN roles ON employees.role_id = roles.id', (err, res)=>{
//         if (err) throw err;
//         console.table(res);
//             employeeTracker()
//     })
// }

// function employeeUpdate(){
//     connection.query('SELECT employees.last_name, role.title FRO')
// }