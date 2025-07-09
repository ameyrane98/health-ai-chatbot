import { useState } from "react";
import { Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Chat() {
  const navigate = useNavigate();
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    try {
      const res = await fetch("http://localhost:8000/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ user_input: input }),
      });

      if (!res.ok) {
        throw new Error("Failed to get response from chatbot");
      }

      const data = await res.json();

      // Add user input & bot response to chat history
      setMessages((prev) => [
        ...prev,
        { role: "user", text: input },
        { role: "bot", text: data.msg },
      ]);

      setInput("");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: "2rem auto", padding: "1rem" }}>
      <h2>Health Coach Chatbot 🤖</h2>

      <div style={{ minHeight: 200, marginBottom: "1rem" }}>
        {messages.map((m, idx) => (
          <div key={idx} style={{ margin: "0.5rem 0" }}>
            <strong>{m.role === "user" ? "You:" : "Bot:"}</strong> {m.text}
          </div>
        ))}
      </div>

      <TextField
        fullWidth
        placeholder="Type your message..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <Button variant="contained" sx={{ mt: 2 }} onClick={sendMessage}>
        Send
      </Button>

      <Button variant="outlined" sx={{ mt: 2, ml: 2 }} onClick={handleLogout}>
        Logout
      </Button>
    </div>
  );
}
