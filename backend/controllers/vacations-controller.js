const express = require("express");
const router = express.Router();
const authenticateJwtRequestToken = require("../middleware/login-filter.js");
const checkAdminAccess = require("../middleware/admin-filter");
const vacationsLogic = require("../logic/vacations-logic.js");
const uploadController = require('./upload-controller');

// Get all vacations from DB
router.get("/", authenticateJwtRequestToken, async (request, response, next) => {
    try {
        let allVacations = await vacationsLogic.getAllVacations();
        response.json(allVacations);
    }
    catch (error) {
        console.log(error);
        return next(error);
    }
});

// Add a new vacation
router.post("/", authenticateJwtRequestToken, checkAdminAccess, async (request, response, next) => {
    const vacation = request.body;
    try {
        const successfulAddedVacationDetails = await vacationsLogic.addVacation(vacation);
        response.json(successfulAddedVacationDetails);
    }
    catch (error) {
        console.log(error);
        return next(error);
    }
})

// Edit vacation
router.put("/:id", authenticateJwtRequestToken, checkAdminAccess, async (request, response, next) => {
    let id = request.params.id;
    const vacationToEdit = request.body;

    try {
        const successfulEditedVacationDetails = await vacationsLogic.editVacation(id, vacationToEdit);
        response.json(successfulEditedVacationDetails);
    }
    catch (error) {
        console.log(error);
        return next(error);
    }
})

// Delete vacation by ID
router.delete("/:id", authenticateJwtRequestToken, checkAdminAccess, async (request, response, next) => {
    let id = request.params.id;

    try {
        let vacationToDeleteDetails = await vacationsLogic.deleteVacation(id);
        response.json(vacationToDeleteDetails);
    }
    catch (error) {
        console.log(error);
        return next(error);
    }
})

// Vacation picture upload
router.post("/upload", authenticateJwtRequestToken, uploadController.upload.single('vacationImage'), async (req, res, next) => {
    res.json(req.file);
})

router.get("/charts", authenticateJwtRequestToken, checkAdminAccess, async (request, response, next) => {
    try {
        let vacationsData = await vacationsLogic.getDataForCharts();
        response.json(vacationsData)
    }
    catch (error) {
        return next(error)
    }
});

module.exports = router;