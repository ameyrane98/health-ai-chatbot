import { useState } from "react";

function Chat() {
  const token = localStorage.getItem("token");
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  const sendMessage = async () => {
    const res = await fetch("http://localhost:8000/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_input: input }),
    });

    const data = await res.json();
    setMessages([
      ...messages,
      { role: "user", text: input },
      { role: "bot", text: data.response },
    ]);
    setInput("");
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>🩺 Health Chatbot</h1>
      {messages.map((msg, i) => (
        <div key={i}>
          <strong>{msg.role}:</strong> {msg.text}
        </div>
      ))}
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Ask something..."
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

export default Chat;
