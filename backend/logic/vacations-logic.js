let vacationsDao = require("../dao/vacations-dao");
let followedVacationsDao = require("../dao/followed-vacations-dao");
const ServerError = require("../errors/server-error");
const ErrorType = require("../errors/error-type");
let pushController = require("../controllers/push-controller")


// Get all vacations
async function getAllVacations() {
    let allVacationsData = await vacationsDao.getAllVacations();
    return allVacationsData;
}

// Add new vacation
async function addVacation(vacation) {
    // Validation
    if (await vacationsDao.isVacationAlreadyExist(vacation)) {
        throw new ServerError(ErrorType.VACATION_ALREADY_EXIST);
    }
    await vacationsDao.addVacation(vacation);
}

// edit vacation
async function editVacation(id, vacation) {
    await vacationsDao.editVacation(id, vacation);
    pushController.updateVacations(); // Socket IO update
}

// Delete vacation
async function deleteVacation(id) {
    let existInFollowedVacations = await followedVacationsDao.isExistsInFollowedVacations(id); // Check if a user followed the vacation

    if (existInFollowedVacations) {
        await followedVacationsDao.deleteVacationFromFollowedVacations(id); // If the vacation is followed, delete it from followed vacations
    }

    await vacationsDao.deleteVacation(id);

    pushController.updateVacations(); // Socket IO update
}

async function getDataForCharts() {
    return await vacationsDao.getDataForCharts();
}

module.exports = {
    getAllVacations,
    addVacation,
    editVacation,
    deleteVacation,
    getDataForCharts
};