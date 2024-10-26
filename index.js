"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.users = void 0;
const index_1 = require("./src/http_server/index");
const ws_1 = require("ws");
const HTTP_PORT = 8181;
exports.users = [];
const wsServer = new ws_1.WebSocketServer({ port: 3000 });
wsServer.on("connection", (ws) => {
    console.log("WebSocket Server is working");
    ws.on('message', (data) => {
        console.log("I recieved data", JSON.parse(data.toString()));
    });
});
// ws.on('open', () => {
//     console.log('I am open')
// })
console.log(`Start static http server on the ${HTTP_PORT} port!`);
index_1.httpServer.listen(HTTP_PORT);
