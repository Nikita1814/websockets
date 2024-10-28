import { httpServer } from "./src/http_server/index";
import WebSocket, { WebSocketServer } from 'ws';
import { randomUUID } from "node:crypto";
import { CreateRoomRequest, RoomAddRequest, RoomData, UpdateRoomResponse, UpdateWinnersResponse, UserData, UserRegRequest } from "./src/http_server/interfaces";

const HTTP_PORT = 8181;


export const users: UserData[] = []
export const rooms: RoomData[] = []


const wsServer = new WebSocketServer({port: 3000});


const regUser = function (requestDto: UserRegRequest, registeredPlayer: UserData | null){
    const userData = JSON.parse(requestDto.data as string)
            const uuId = randomUUID();

            const newUser = {
                id: requestDto.id,
                uuId: uuId,
                name: userData.name,
                password: userData.password,
                wins:0
            }
            users.push(newUser);
            registeredPlayer = newUser
            const responseData = {
                type: "reg",
                data:
                    JSON.stringify({
                        name: userData.name,
                        password: userData.password,
                    }),
                id: 0,
            }
            return responseData
}

const createRoom = function () {
    const uuId = randomUUID();
    const newRoom = {
        roomId: uuId,
        roomUsers:[]
    }

    rooms.push(newRoom);
    console.log('new rooms are', rooms)
}

const returnUpdatedRooms = function (): UpdateRoomResponse {

    const mappedRoomsData = JSON.stringify(rooms.map((room) => {return {
        ...room,
        roomUsers: room.roomUsers.map(user => {return {name: user.name, index: user.index}})
    }}))
    console.log('mapped rooms data', mappedRoomsData)
    const response = {
        type: "update_room",
        data: mappedRoomsData,
        id: 0,
    }
    return response
}

const returnUpdatedWinners = function (): UpdateWinnersResponse {
    const response = {
        type: "update_winners",
        data: JSON.stringify(users.map((user) => {
            return  {
               name: user.name,
               wins: user.wins 
            }
        })),
        id: 0,
    }
    return response
}

const addUserToRoom = function(data: RoomAddRequest, registeredPlayer: UserData) {
    const roomdata = JSON.parse(data.data)
    const roomToAddIdx = rooms.findIndex((room) => {
       return  room.roomId === roomdata.indexRoom
    })
    rooms[roomToAddIdx].roomUsers.push({name: registeredPlayer.name, index: registeredPlayer.uuId})
}

const createGame = function() {
    
}

wsServer.on("connection", (ws) => {
    let registeredPlayer: UserData | null = null
    console.log("WebSocket Server is working")
    ws.on('message', (data: UserRegRequest) => {
        console.log("I recieved data", JSON.parse(data.toString()));
        const parsedData = JSON.parse(data.toString())
        const dataType = parsedData.type
        console.log('Data', dataType)
        if (dataType === "reg") {
            console.log("reg respons recieved")
            // const responseData = regUser(parsedData);
            ws.send(JSON.stringify(regUser(parsedData, registeredPlayer)));
            ws.send(JSON.stringify(returnUpdatedRooms()))
            ws.send(JSON.stringify(returnUpdatedWinners())) 
        } else if (dataType === "create_room" && registeredPlayer) {
            // const responseData = regUser(data);
            console.log(parsedData)
            createRoom()

            ws.send(JSON.stringify(returnUpdatedRooms()))
        } else if (dataType === "add_user_to_room") {
        }
    })
})

console.log(`Start static http server on the ${HTTP_PORT} port!`);
httpServer.listen(HTTP_PORT);

