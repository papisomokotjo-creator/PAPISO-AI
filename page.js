'use client'
import { useState } from 'react'

export default function Home() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('Ask me anything...')
  const [loading, setLoading] = useState(false)

  async function sendMessage() {
    if (!input) return
    setLoading(true)
    setOutput('Thinking...')
    
    const res = await fetch('/api/chat', {
      method: 'POST',
      body: JSON.stringify({ message: input })
    })
    const data = await res.json()
    setOutput(data.reply)
    setLoading(false)
    setInput('')
  }

  return (
    <main style={{background:'#0a0a0a', color:'white', minHeight:'100vh', padding:20, display:'flex', justifyContent:'center', alignItems:'center'}}>
      <div style={{width:'100%', maxWidth:600}}>
        <h1 style={{color:'#00ff88', marginBottom:20}}>Papiso AI</h1>
        <div style={{display:'flex', gap:10, marginBottom:20}}>
          <input 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me anything..."
            style={{flex:1, padding:12, borderRadius:8, border:'none', background:'#2a2a2a', color:'white', fontSize:16}}
          />
          <button onClick={sendMessage} disabled={loading} style={{padding:'12px 20px', borderRadius:8, border:'none', background:'#00ff88', color:'black', fontWeight:'bold', cursor:'pointer'}}>
            {loading? '...' : 'Send'}
          </button>
        </div>
        <div style={{background:'#1a1a1a', padding:15, borderRadius:8, minHeight:100}}>
          {output}
        </div>
      </div>
    </main>
  )
}