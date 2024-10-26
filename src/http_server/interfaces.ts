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
    name: string,
    password: string
}


export interface CreateRoomRequest {
    type: "create_room",
    data: "",
    id: 0,
}

export interface RoomData {
    roomId: number | string,
    roomUsers: RoomUserInfo[],
}

export interface RoomUserInfo {
        name: string,
        index: number | string,
    }
