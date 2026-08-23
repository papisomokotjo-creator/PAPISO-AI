'use client';
import { useState } from 'react';

export default function Home() {
  const [message, setMessage] = useState('');
  const [reply, setReply] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    setLoading(true);
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message })
    });
    const data = await res.json();
    setReply(data.reply);
    setLoading(false);
  };

  return (
    <div style={{padding: '20px'}}>
      <h1>Papiso AI</h1>
      <input 
        value={message} 
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Ask me anything..."
        style={{width: '300px', padding: '10px'}}
      />
      <button onClick={sendMessage} disabled={loading}>
        {loading ? 'Thinking...' : 'Send'}
      </button>
      <p>{reply}</p>
    </div>
  );
}