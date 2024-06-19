const socket = io("http://localhost:3000/");

let urlSearch = new URLSearchParams(document.location.search);

var ursername = urlSearch.get("username");
const room = urlSearch.get('select_room');

socket.emit("select_room", {
  ursername,
  room
}
);
document
  .getElementById('message_id')
  ?.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {

      const target = event.target
      if (target) {
        const message = target.value;
        console.log(message);
        
        const data = {
          room,
          message,
          username
        }
        socket.emit('message', message)
      }

    }





  })
console.log(ursername, room)

