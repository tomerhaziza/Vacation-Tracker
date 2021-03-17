const express = require("express");
const expressServer = express();
const http = require("http");
const socketIO = require("socket.io");
const cache = require("../controllers/cache-controller");
const httpServer = http.createServer(expressServer);
const socketServer = socketIO(httpServer, { cors: { origin: "http://localhost:3000" } });

let userIdToSocketMap = new Map();
socketServer.on("connection", socket => {
    let socketRequest = socket.request;
    let token = socketRequest._query["token"]
    let userData = cache.getUserData(token);
    if (userData) {
        let userId = userData.id
        userIdToSocketMap.set(userId, socket);
        console.log("user " + userId + " connected");
    }


    socket.on("disconnect", () => {
        let socketRequest = socket.request;
        let token = socketRequest._query["token"]
        let userData = cache.getUserData(token);
        if (userData) {
            let userId = userData.id
            userIdToSocketMap.delete(userId);
            console.log("user " + userId + " disconnected");
        }
    })
});


async function updateVacations() {
    for ([userId, socket] of userIdToSocketMap) {
        socket.emit('UPDATE VACATIONS');
    }
}

httpServer.listen(3002, () => console.log("Push server listening on port 3002..."));


module.exports = { httpServer, updateVacations } 