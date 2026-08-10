import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req) {
  try {
    const { messages } = await req.json();

    const completion = await groq.chat.completions.create({
      messages: [
        { role: "system", content: "You are Papiso-AI. You can chat in any language. Be helpful, short, and friendly." },
       ...messages,
      ],
      model: "qwen/qwen3.6-27b",
      temperature: 0.8,
      max_tokens: 1000,
    });

    return Response.json({ reply: completion.choices[0].message.content });

  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}