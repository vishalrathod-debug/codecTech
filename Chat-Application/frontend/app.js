
const socket = io("http://localhost:3001");

let username = "";
let room = "";

function joinRoom() {
  username = document.getElementById("username").value;
  room = document.getElementById("room").value;

  if (username && room) {
    socket.emit("join_room", room);
    loadMessages();
  }
}

async function loadMessages() {
  const res = await fetch(`http://localhost:3001/messages/${room}`);
  const messages = await res.json();

  messages.forEach(msg => displayMessage(msg));
}

function sendMessage() {
  const messageInput = document.getElementById("message");
  const message = messageInput.value;

  if (message !== "") {
    const msgData = {
      room,
      author: username,
      message
    };

    socket.emit("send_message", msgData);
    displayMessage(msgData);

    messageInput.value = "";
  }
}

socket.on("receive_message", (data) => {
  displayMessage(data);
});

function displayMessage(data) {
  const chatBox = document.getElementById("chat-box");

  const div = document.createElement("div");
  div.classList.add("message");

  if (data.author === username) {
    div.classList.add("me");
  } else {
    div.classList.add("other");
  }

  div.innerText = `${data.author}: ${data.message}`;
  chatBox.appendChild(div);
}
