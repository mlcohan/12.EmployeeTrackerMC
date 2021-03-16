const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    // your password goes here
    password:'',
    database: 'employees_db'
});

const employeeTracker = () => {
    connection.query('SELECT what you would like to do', (err, res) => {
        if (err) throw err;

        console.log(res)
        connection.end()
    });
}

connection.connect((err)=>{
    if (err) throw err;
    console.log('connected as id ${connection.threadId}\n');
    employeeTracker();
})