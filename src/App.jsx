import { useEffect, useRef, useState } from "react";
import Peer from "peerjs";
import "./App.css";

function App() {
  const [peerId, setPeerId] = useState("");
  const [inputId, setInputId] = useState("");
  const [messages, setMessages] = useState(["dummy message"]);
  const peer = new Peer();

  useEffect(() => {
    peer.on("open", (id) => {
      console.log("My peer ID is: " + id);
      setPeerId(id);
    });
    peer.on("connection", (conn) => {
      conn.on("data", (data) => {
        console.log(data);
        setMessages((messages) => [...messages, data]);
      });
      conn.on("open", () => {
        conn.send("hello!");
      });
    });
  }, []);

  return (
    <div className="App">
      <h1>Peer ID: {peerId}</h1>
      <h2>Messages</h2>
      <input
        type="text"
        onChange={(e) => {
          setInputId(e.target.value);
        }}
      />
      <button
        onClick={() => {
          const conn = peer.connect(inputId);
          conn.on("open", () => {
            conn.send("hi!");
          });
        }}
      >
        Connect
      </button>
      <ul>
        {messages.map((message, i) => (
          <li key={i}>{message}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
