let connection = require("./connection-wrapper");

// User follow a vacation vacation
async function followVacation(userId, vacationId) {
    let sql = "INSERT INTO followed_vacations (userId, vacationId)  values(?, ?)";
    let parameters = [userId, vacationId];
    try {
        await connection.executeWithParameters(sql, parameters);
        await updateVacationFollowersAmount(vacationId)
    }
    catch (e) {
        console.log(e);
    }
}

// User unfollows a vacation
async function unfollowVacation(userId, vacationId) {
    let sql = "DELETE FROM followed_vacations where userId=? and vacationId=?";
    let parameters = [userId, vacationId];
    try {
        await connection.executeWithParameters(sql, parameters);
        await updateVacationFollowersAmount(vacationId);
    }
    catch (e) {
        console.log(e);
    }
}

// Get followed vacations by user
async function getVacationsFollowedByUser(userId) {
    let sql = `SELECT vacations.id, destination, description, imageUrl, price, startDate, endDate, followersAmount
                FROM vacations
                INNER JOIN followed_vacations
                ON followed_vacations.vacationId = vacations.id
                WHERE followed_vacations.userId = ?
                GROUP BY vacations.id`
    let parameters = [userId];

    try {
        return vacationsFollowedData = await connection.executeWithParameters(sql, parameters);
    }
    catch (e) {
        console.log(e)
    }
}

// Get vacations not followed by user
async function getVacationsNotFollowed(userId) {
    let sql = `SELECT vacations.id, destination, description, imageUrl, price, startDate, endDate, followersAmount
                FROM vacations
                LEFT OUTER JOIN followed_vacations
                ON vacations.id = followed_vacations.vacationId
                AND followed_vacations.userId = ?
                WHERE followed_vacations.vacationId IS NULL
                GROUP BY vacations.id`
    let parameters = [userId];
    let vacationsNotFollowedData;

    try {
        vacationsNotFollowedData = await connection.executeWithParameters(sql, parameters);
    }
    catch (e) {
        console.log(e);
    }

    return vacationsNotFollowedData;
}

// Delete vacation in followed vacations
async function deleteVacationFromFollowedVacations(id) {
    let sql = "delete from followed_vacations where vacationId=?"
    let parameters = [id];
    await connection.executeWithParameters(sql, parameters);
}

// Check if a the vacation is being followed by a user before delete
async function isExistsInFollowedVacations(id) {
    let sql = "select vacationId from followed_vacations where vacationId=?";
    let parameters = [id];
    let vacationExists = await connection.executeWithParameters(sql, parameters);
    if (vacationExists[0]) return true;
    else return false;
}

// The following 2 functions update vacation followers amount

async function getVacationFollowersAmount(vacationId) {
    let sql = `SELECT COUNT(vacationId) AS amount
                FROM followed_vacations
                WHERE vacationId = ?`;
    let parameters = [vacationId];
    let followersAmount

    try {
        followersAmount = await connection.executeWithParameters(sql, parameters);
        return followersAmount[0].amount;
    }
    catch (e) {
        console.log(e);
    }
}

async function updateVacationFollowersAmount(vacationId) {
    let followersAmount = await getVacationFollowersAmount(vacationId);
    let sql = "UPDATE vacations SET followersAmount = ? WHERE id = ?"
    let parameters = [followersAmount, vacationId];

    try {
        await connection.executeWithParameters(sql, parameters);
    }
    catch (e) {
        console.log(e);
    }
}

module.exports = {
    followVacation,
    unfollowVacation,
    getVacationsFollowedByUser,
    deleteVacationFromFollowedVacations,
    isExistsInFollowedVacations,
    getVacationsNotFollowed,
    getVacationFollowersAmount,
    updateVacationFollowersAmount
}