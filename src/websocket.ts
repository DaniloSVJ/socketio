import { io } from './http'
interface RoomUser {
    socket_id: string,
    ursername: string,
    room: string
}
interface Message {
    room: string,
    text: string,
    createdAt: Date,
    username: string,


}
const users: RoomUser[] = []
const messages: Message[] = []
io.on("connection", (socket) => {
    socket.on("select_room", (data) => {
        // console.log("___________________")
        // console.log(socket.id)
        // console.log("=====================")
        //quando usuario se logar ele já vai armazenar essas informações dentro do array
        socket.join(data.room);
        const userInRoom = users.find((user) => user.ursername === data.ursername && user.room === data.room);
        if (userInRoom) {
            userInRoom.socket_id = socket.id

        } else {
            users.push({
                room: data.room,
                ursername: data.ursername,
                socket_id: socket.id
            })
        }
    });

    socket.on('message', data => {
        const message: Message = {
            room: data.room,
            username: data.username,
            text: data.text,
            createdAt: data.createdAt
        }

        messages.push(message);

    })



})