let ServerError = require("./../errors/server-error");
let ErrorType = require("./../errors/error-type");
const mysql = require("mysql2");

// Connection to DB
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "tomerhaziza9",
    database: "vacations_project"
});

// Connect to the database: 
connection.connect(err => {
    if (err) {
        console.log("Failed to create connection + " + err);
        return;
    }
    console.log("We're connected to MySQL");
});


// One function for executing select / insert / update / delete: 
function execute(sql) {
    return new Promise((resolve, reject) => {
        connection.query(sql, (err, result) => {
            if (err) {
                console.log("Error " + err);
                reject(err);
                return;
            }
            resolve(result);
        });
    });
}

function executeWithParameters(sql, parameters) {
    return new Promise((resolve, reject) => {
        connection.query(sql, parameters, (err, result) => {
            if (err) {
                //console.log("Error " + err);
                console.log("Failed interacting with DB, calling reject");
                reject(err);
                return;
            }
            resolve(result);
        });
    });
}

module.exports = {
    execute,
    executeWithParameters
};