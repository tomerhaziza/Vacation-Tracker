const express = require('express');
const router = express.Router();
const usersLogic = require("../logic/users-logic.js");
const cache = require('../controllers/cache-controller')
const authenticateJwtRequestToken = require("../middleware/login-filter.js");

// User login
router.post("/login", async (request, response, next) => {

    let user = request.body;
    try {
        let successfullLoginData = await usersLogic.login(user);
        response.json(successfullLoginData);
    }
    catch (error) {
        console.log(error);
        return next(error);
    }
});

// New user register
router.post("/", async (request, response, next) => {
    let user = request.body;

    try {
        let successfulRegiseterDetails = await usersLogic.addUser(user);
        response.json(successfulRegiseterDetails);
    }
    catch (error) {
        console.log(error);
        return next(error);
    }
})

// Get user details
router.get("/me", authenticateJwtRequestToken, async (request, response, next) => {
    try {
        const authorizationString = request.headers.authorization;
        const token = authorizationString.substring("Bearer ".length);
        const userData = cache.getUserData(token);
        response.json(userData);
    }
    catch (error) {
        console.log(error);
        return next(error);
    }
});

module.exports = router;