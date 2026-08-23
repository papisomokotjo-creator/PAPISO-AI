import Groq from 'groq-sdk';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req) {
  const { message } = await req.json();
  
  const chatCompletion = await groq.chat.completions.create({
    messages: [{ role: "user", content: message }],
    model: "llama3-8b-8192",
  });

  return Response.json({ reply: chatCompletion.choices[0].message.content });
}