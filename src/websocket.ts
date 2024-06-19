import { io } from './http'
interface RoomUser {
    socket_id: string,
    username: string,
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
        const userInRoom = users.find((user) => user.username === data.username && user.room === data.room);
        if (userInRoom) {
            userInRoom.socket_id = socket.id

        } else {
            users.push({
                room: data.room,
                username: data.username,
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
        io.to(data.room).emit("message", message);

    })



})