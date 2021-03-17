const jwt = require('jsonwebtoken');
const { secret } = require('../config.json');

function getUserData(token) {
    const decodedJwt = jwt.verify(token, secret);

    return decodedJwt.user;
}

function getUserId(authHeader) {
    const token = authHeader.split(' ')[1];
    const decodedJwt = jwt.verify(token, secret);

    return decodedJwt.user.id;
}

function isAdmin(authHeader) {
    const token = authHeader.split(' ')[1];
    const decodedJwt = jwt.verify(token, secret);

    const userType = decodedJwt.user.userType;
    if (userType === 'ADMIN') {
        return true;
    }
    return false;
}

module.exports = {
    getUserData,
    getUserId,
    isAdmin,
}