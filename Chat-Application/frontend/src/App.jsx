import { useState, useEffect } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:3001");

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [message, setMessage] = useState("");
  const [list, setList] = useState([]);

  const joinRoom = () => {
    socket.emit("join_room", room);
  };

  const sendMessage = () => {
    const data = {
      room,
      author: username,
      message,
      time: new Date().toLocaleTimeString()
    };

    socket.emit("send_message", data);
    setList((prev) => [...prev, data]);
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setList((prev) => [...prev, data]);
    });
  }, []);

  return (
    <div>
      <h2>Chat</h2>
      <input placeholder="Name" onChange={e => setUsername(e.target.value)} />
      <input placeholder="Room" onChange={e => setRoom(e.target.value)} />
      <button onClick={joinRoom}>Join</button>

      <div>
        {list.map((msg, i) => (
          <p key={i}>{msg.author}: {msg.message}</p>
        ))}
      </div>

      <input onChange={e => setMessage(e.target.value)} />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

export default App;
