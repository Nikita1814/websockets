export interface UserRegRequest {
    type: string,
    data:
        {
            name: string,
            password: string,
        },
    id: string,
}

export interface UserData {
    id:string,
    uuId: string,
    name: string,
    password: string
    wins: number
}


export interface CreateRoomRequest {
    type: "create_room",
    data: "",
    id: 0,
}

export interface UpdateRoomResponse {
    type: string,
    data: RoomData[],
    id: number,
}

export interface UpdateWinnersResponse {
    type: string,
    data: {name: string, wins: number}[],
    id: number,
}

export interface RoomData {
    roomId: number | string,
    roomUsers: RoomUserInfo[],
}

export interface RoomUserInfo {
        name: string,
        index: number | string,
    }