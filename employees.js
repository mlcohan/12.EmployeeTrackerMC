const mysql = require('mysql');

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
            'View all Departments',
            // 'View all Employees by Department',
            // 'View all Employees by Manager',
            'View All Roles',
            'Update Employee Role',
            // 'Remove Employee',
            
            // 'Update Employee Manager',
          
            // 'Remove Role',
        ],
    })
    .then((answer) => {
        switch (answer.action) {
            case 'View all employees':
            employeeSearch();
            break;

            case 'View all employees':
            employeeSearch();
            break;

            case 'View all employees':
            employeeSearch();
            break;

            case 'View all employees':
            employeeSearch();
            break;


                
        }
    })
}