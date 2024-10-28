export interface UserRegRequest {
    type: string,
    data:string,
    id: string,
}


// {
//     name: string,
//     password: string,
// },

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
    data: string,
    id: number,
}
// RoomData[]
export interface UpdateWinnersResponse {
    type: string,
    data: string,
    id: number,
}

// {name: string, wins: number}[],

export interface RoomData {
    roomId: number | string,
    roomUsers: RoomUserInfo[],
}

export interface RoomUserInfo {
        name: string,
        index: number | string,
    }

export interface RoomAddRequest {
        type: "add_user_to_room",
        data: string
        id: 0,
    }
export interface Game {

}
    //  indexRoom: <number | string>