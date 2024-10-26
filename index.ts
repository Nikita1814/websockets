import { httpServer } from "./src/http_server/index";
import WebSocket, { WebSocketServer } from 'ws';
import { randomUUID } from "node:crypto";
import { RoomData, UserData, UserRegRequest } from "./src/http_server/interfaces";

const HTTP_PORT = 8181;


export const users: UserData[] = []
export const rooms: RoomData[] = []

const wsServer = new WebSocketServer({port: 3000});

wsServer.on("connection", (ws) => {
    console.log("WebSocket Server is working")
    ws.on('message', (data: UserRegRequest) => {
        console.log("I recieved data", JSON.parse(data.toString()));
        const dataType = data.type
        if (dataType === "reg") {
            const userData = JSON.parse(JSON.parse(data.toString()).data)
            // const id = randomUUID();

            const newUser = {
                id: data.id,
                name: userData.name,
                password: userData.password
            }
            users.push(newUser);

            const responseData = {
                type: "reg",
                data:
                    JSON.stringify({
                        name: userData.name,
                        password: userData.password,
                    }),
                id: data.id,
            }
            ws.send(JSON.stringify(responseData));
        }
    })
})



// ws.on('open', () => {
//     console.log('I am open')
// })

console.log(`Start static http server on the ${HTTP_PORT} port!`);
httpServer.listen(HTTP_PORT);
