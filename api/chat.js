export default async function handler(req, res) {
  if (req.method!== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { message } = req.body;

    const groqResponse = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'llama-3.1-8b-instant',
        messages: [
          { role: 'system', content: 'O bitsoa Papiso AI. Araba ka Sesotho se setle, se mosa le se thusang.' },
          { role: 'user', content: message }
        ]
      })
    });

    const data = await groqResponse.json();
    
    // Sena ke sona se lokisang undefined
    const reply = data.choices?.[0]?.message?.content || "Maswabi, ha ke a khona ho araba hona joale. Leka hape";
    
    res.status(200).json({ reply });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}