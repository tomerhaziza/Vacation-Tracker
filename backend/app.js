const express = require("express");
const server = express();
const usersController = require("./controllers/users-controller");
const vacationsController = require("./controllers/vacations-controller");
const followedVacationsController = require("./controllers/followed-vacations-controller");
const errorHandler = require("./errors/error-handler");
const cors = require('cors');
require('./controllers/push-controller');

server.use(express.json());
server.use(cors({ origin: ["http://localhost:3000", "http://localhost:4200"] }));
server.use("/users", usersController);
server.use("/vacations", vacationsController);
server.use("/followed-vacations", followedVacationsController);
server.use('/uploads', express.static('uploads'));
server.use(errorHandler);

server.listen(3001, () => console.log("Listening on http://localhost:3001"));