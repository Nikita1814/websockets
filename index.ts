import { httpServer } from "./src/http_server/index";
import WebSocket, { WebSocketServer } from 'ws';
import { randomUUID } from "node:crypto";
import { CreateRoomRequest, RoomData, UpdateRoomResponse, UpdateWinnersResponse, UserData, UserRegRequest } from "./src/http_server/interfaces";

const HTTP_PORT = 8181;


export const users: UserData[] = []
export const rooms: RoomData[] = []

const wsServer = new WebSocketServer({port: 3000});


const regUser = function (data: UserRegRequest){
    const userData = JSON.parse(JSON.parse(data.toString()).data)
            const uuId = randomUUID();

            const newUser = {
                id: data.id,
                uuId: uuId,
                name: userData.name,
                password: userData.password,
                wins:0
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
            return responseData
}

const createRoom = function (data:CreateRoomRequest ) {
    
}

const returnUpdatedRooms = function (): UpdateRoomResponse {
    const response = {
        type: "update_room",
        data: rooms,
        id: 0,
    }
    return response
}

const returnUpdatedWinners = function (): UpdateWinnersResponse {
    const response = {
        type: "update_winners",
        data: users.map((user) => {
            return  {
               name: user.name,
               wins: user.wins 
            }
        }),
        id: 0,
    }
    return response
}

wsServer.on("connection", (ws) => {
    console.log("WebSocket Server is working")
    ws.on('message', (data: UserRegRequest) => {
        console.log("I recieved data", JSON.parse(data.toString()));
        const dataType = data.type
        if (dataType === "reg") {
            const responseData = regUser(data);
            ws.send(JSON.stringify(responseData));
            ws.send(JSON.stringify(returnUpdatedRooms()))
            ws.send(JSON.stringify(returnUpdatedWinners()))
        }
    })
})

console.log(`Start static http server on the ${HTTP_PORT} port!`);
httpServer.listen(HTTP_PORT);

