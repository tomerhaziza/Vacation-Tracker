const followedVacationsLogic = require('../logic/followed-vacations-logic');
const express = require('express')
const router = express.Router();
const cache = require('../controllers/cache-controller')
const authenticateJwtRequestToken = require("../middleware/login-filter.js");

// Get vacations followed by user
router.get("/", authenticateJwtRequestToken, async (request, response, next) => {
    // Get user ID from token
    const authorizationString = request.headers.authorization;
    const userId = cache.getUserId(authorizationString);

    try {
        let vacationsFollowedData = await followedVacationsLogic.getVacationsFollowedByUser(userId);
        response.json(vacationsFollowedData);
    }
    catch (error) {
        console.log(error);
        return next(error);
    }
})

// Get vacations not followed by user
router.get("/not", authenticateJwtRequestToken, async (request, response, next) => {
    try {
        const authorizationString = request.headers.authorization;
        let userId = cache.getUserId(authorizationString);

        let vacationsNotFollowedData = await followedVacationsLogic.getVacationsNotFollowed(userId);
        response.json(vacationsNotFollowedData);
    }
    catch (error) {
        console.log(error);
        return next(error);
    }
});

// Follow a vacation
router.post('/:id', authenticateJwtRequestToken, async (request, response, next) => {
    const vacationId = request.params.id;

    // Get user ID from token
    const authorizationString = request.headers.authorization;

    const userId = cache.getUserId(authorizationString);

    try {
        const followedVacationDetails = await followedVacationsLogic.followVacation(userId, vacationId);
        response.json(followedVacationDetails);
    }
    catch (error) {
        return next(error);
    }
})

// Unfollow a vacation
router.delete('/:id', authenticateJwtRequestToken, async (request, response) => {
    const vacationId = request.params.id;

    // Get user ID from token
    const authorizationString = request.headers.authorization;

    const userId = cache.getUserId(authorizationString);

    try {
        await followedVacationsLogic.unfollowVacation(userId, vacationId);
        response.json({ status: 'Success' });
    }
    catch (error) {
        return next(error)
    }
})

module.exports = router
