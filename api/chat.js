import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY, // This pulls from Vercel Environment Variables
});

export async function POST(req) {
  const { message } = await req.json();

  const chatCompletion = await groq.chat.completions.create({
    messages: [
      {
        role: "system",
        content: "You are Papiso-AI. You can chat in any language. Be helpful and friendly."
      },
      {
        role: "user", 
        content: message,
      }
    ],
    model: "qwen/qwen3.6-27b", // the multilingual model we picked
    temperature: 0.7,
    max_tokens: 1024,
  });

  return Response.json({ 
    reply: chatCompletion.choices[0]?.message?.content || "No reply" 
  });
}