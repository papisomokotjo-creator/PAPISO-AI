"use client";
import { useState } from "react";

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;
    
    const userMessage = { role: "user", content: input };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });

      const data = await res.json();
      setLoading(false);

      if (data.error) {
        setMessages([...newMessages, { role: "assistant", content: "Error: " + data.error }]);
        return;
      }

      setMessages([...newMessages, { role: "assistant", content: data.reply }]);
    } catch (err) {
      setLoading(false);
      setMessages([...newMessages, { role: "assistant", content: "Failed to connect to server" }]);
    }
  };

  return (
    <div style={{ maxWidth: 700, margin: "40px auto", padding: 20, fontFamily: "sans-serif" }}>
      <h1>Papiso-AI 🌍 Chat</h1>
      <div style={{ border: "1px solid #ddd", borderRadius: 8, height: 450, overflowY: "auto", padding: 15, background: "#f9f9f9" }}>
        {messages.length === 0 && <p>Start chatting in any language...</p>}
        {messages.map((m, i) => (
          <div key={i} style={{ marginBottom: 12, textAlign: m.role === 'user'? 'right' : 'left' }}>
            <b>{m.role === 'user'? 'You' : 'AI'}:</b> {m.content}
          </div>
        ))}
        {loading && <p><i>Thinking...</i></p>}
      </div>
      <div style={{ display: "flex", marginTop: 15, gap: 10 }}>
        <input 
          value={input} 
          onChange={(e) => setInput(e.target.value)} 
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Type in Arabic, English, Sesotho..." 
          style={{ flex: 1, padding: 12, borderRadius: 8, border: "1px solid #ccc" }}
        />
        <button onClick={sendMessage} disabled={loading} style={{ padding: "12px 20px", borderRadius: 8, border: "none", background: "#0070f3", color: "white", cursor: "pointer" }}>
          Send
        </button>
      </div>
    </div>
  );
}