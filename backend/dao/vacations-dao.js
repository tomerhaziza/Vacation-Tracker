const connection = require('./connection-wrapper');

// Get all vacations
async function getAllVacations() {
    let sql = "SELECT * FROM vacations";

    let allVacationsData;
    try {
        allVacationsData = await connection.execute(sql);
    }
    catch (e) {
        console.log(e);
    }

    return allVacationsData;
}


// IS VACATION EXISTS
async function isVacationAlreadyExist(vacation) {
    let sql = "SELECT * FROM vacations WHERE destination=? and description=? and price=? and startDate=? and endDate=?";
    let parameters = [vacation.destination, vacation.description, vacation.price, vacation.startDate, vacation.endDate];
    let result = await connection.executeWithParameters(sql, parameters);

    if (!result.length || !result) {
        return false;
    }
    return true;
}

// Add a new vacation
async function addVacation(vacation) {
    let sql = "INSERT INTO vacations (destination, description, imageUrl, price, startDate, endDate, followersAmount)  values(?, ?, ?, ?, ?, ?, ?)";
    let parameters = [vacation.destination, vacation.description, vacation.imageUrl, vacation.price, vacation.startDate, vacation.endDate, 0];
    try {
        await connection.executeWithParameters(sql, parameters);
    }
    catch (e) {
        console.log(e);
    }
}

// Edit vacation
async function editVacation(id, vacation) {
    let sql = "UPDATE vacations SET destination = ?, description= ?, imageUrl = ?, price = ?, startDate = ?, endDate = ?, followersAmount = ? WHERE id=?";
    let parameters = [vacation.destination, vacation.description, vacation.imageUrl, vacation.price, vacation.startDate, vacation.endDate, 0, id];
    try {
        await connection.executeWithParameters(sql, parameters);
    }
    catch (e) {
        console.log(e);
    }
}

// Delete vacation
async function deleteVacation(id) {
    let sql = "delete from vacations where id=?";
    let parameters = [id];
    await connection.executeWithParameters(sql, parameters);
}

// GET VACATION DATA FOR CHARTS
async function getDataForCharts() {
    let sql = "SELECT destination, followersAmount FROM vacations WHERE followersAmount != 0";
    try {
        let result = await connection.execute(sql);
        return result;
    } catch (e) {
        throw new ServerError(ErrorType.GENERAL_ERROR, sql, e);
    }
}

module.exports = {
    getAllVacations,
    addVacation,
    editVacation,
    deleteVacation,
    isVacationAlreadyExist,
    getDataForCharts
};