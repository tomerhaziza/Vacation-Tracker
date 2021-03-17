let connection = require("./connection-wrapper");
const ServerError = require('../errors/server-error');
const ErrorType = require('../errors/error-type');

// Add registered user to DB
async function addUser(user) {
    const sql = "INSERT INTO users (username, password, firstName, lastName)  values(?, ?, ?, ?)";
    const parameters = [user.username, user.password, user.firstName, user.lastName];
    try {
        return await connection.executeWithParameters(sql, parameters);
    }
    catch (e) {
        console.log('ERROR ADD USER');
        console.error(e);
    }
}

async function login(user) {
    const sql = "SELECT * FROM users where username =? and password =?";

    const parameters = [user.username, user.password];
    let userLoginData;
    try {
        userLoginData = await connection.executeWithParameters(sql, parameters);
    }
    catch (e) {
        console.log('ERROR USER LOGIN');
        console.error(e);
    }

    // Check if the userName + password do not match
    if (userLoginData == null || userLoginData.length == 0) {
        throw new ServerError(ErrorType.UNAUTHORIZED);
    }
    return userLoginData[0];
}

// Check if username already exist
async function isUserExistByUsername(username) {
    let result
    try {
        let sql = "select username from users where username=?";
        let parameters = [username];
        result = await connection.executeWithParameters(sql, parameters);

        if (result[0]) {
            let usernameResult = result[0].username;
            if (usernameResult == username) return true;
            return false;
        }
        return false;
    }

    catch (e) {
        console.log(e);
        throw new ServerError(ErrorType.GENERAL_ERROR);
    }
}

module.exports = {
    addUser,
    login,
    isUserExistByUsername
};