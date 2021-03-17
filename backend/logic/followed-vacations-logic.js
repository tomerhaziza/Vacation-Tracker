let followedVacationDao = require("../dao/followed-vacations-dao");

// Follow a vacation
async function followVacation(userId, vacationId) {
    await followedVacationDao.followVacation(userId, vacationId);
}
// Unfollow a vacation
async function unfollowVacation(userId, vacationId) {
    await followedVacationDao.unfollowVacation(userId, vacationId);
}

// Get all vacations followed by user
async function getVacationsFollowedByUser(userId) {
    let vacationsFollowedData = await followedVacationDao.getVacationsFollowedByUser(userId);
    return vacationsFollowedData;
}

// Get vacations not followed by user
async function getVacationsNotFollowed(userId) {
    let vacationsNotFollowedData = await followedVacationDao.getVacationsNotFollowed(userId);
    return vacationsNotFollowedData;
}

module.exports = {
    followVacation,
    unfollowVacation,
    getVacationsFollowedByUser,
    getVacationsNotFollowed
}