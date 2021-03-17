const usersDao = require("../dao/users-dao");
let ServerError = require("../errors/server-error");
let ErrorType = require("../errors/error-type");
const crypto = require('crypto');
const config = require('../config.json');
const jwt = require('jsonwebtoken');

// Add user
async function addUser(user) {
    // Validations
    let usernameExist = await usersDao.isUserExistByUsername(user.username)

    if (usernameExist) {
        throw new ServerError(ErrorType.USER_NAME_ALREADY_EXIST);
    }

    user.password = crypto.createHash("md5").update(config.saltLeft + user.password + config.saltRight).digest("hex");

    await usersDao.addUser(user);
}

// Login
async function login(user) {
    user.password = crypto.createHash("md5").update(config.saltLeft + user.password + config.saltRight).digest("hex");
    const userLoginData = await usersDao.login(user);

    const userDetails = { 
        id: userLoginData.id,
        userType: userLoginData.userType,
        username: userLoginData.username
    }

    const payload = {
        sub: config.saltLeft + userDetails.username + config.saltRight,
        user: userDetails
    }

    const token = jwt.sign(payload , config.secret);

    const successfullLoginResponse = { token: token, userType: userLoginData.userType };
    return successfullLoginResponse;
}

module.exports = {
    addUser,
    login
};