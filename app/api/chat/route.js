import Groq from 'groq-sdk';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req) {
  try {
    const { message } = await req.json();
    
    if (!message) {
      return Response.json({ error: 'Message is required' }, { status: 400 });
    }

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are Papiso AI, a helpful assistant."
        },
        {
          role: "user", 
          content: message
        }
      ],
      model: "llama3-8b-8192",
      temperature: 0.7,
      max_tokens: 1024,
    });

    const reply = chatCompletion.choices[0]?.message?.content || "No response";
    
    return Response.json({ reply });

  } catch (error) {
    console.error(error);
    return Response.json({ error: 'Failed to get response from AI' }, { status: 500 });
  }
}