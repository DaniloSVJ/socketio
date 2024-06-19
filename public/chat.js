const socket = io("http://localhost:3000/");

let urlSearch = new URLSearchParams(document.location.search);

var username = urlSearch.get("username");
const room = urlSearch.get('select_room');

socket.emit("select_room", {
  username,
  room
}
);
document
  .getElementById('message_input')
  ?.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {

      const target = event.target
     
        const message = target.value;
        
        const data = {
          room,
          text:message,
          username
        }
      
      
        socket.emit('message', data)
        target.value = '';
   
    }
  })

  socket.on("message", (data)=>{

      console.log(data.username)
      const messageDiv = document.getElementById("messages");

      messageDiv.innerHTML += ` 
          <div class="new_message" >
            <label class="form-label">
                <strong>
                  ${data.username}
                </strong>
                <span>${data.text} - ${dayjs(data.createdAt).format("DD/MM HH:mm")}</span>
            </label>            
          </div>
      `
  })

