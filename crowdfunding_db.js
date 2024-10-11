const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Ritesh@2024",
    database: "crowdfunding_db"
});

connection.connect((err) => {
    if (err) throw err;
    console.log("connected!!");
})