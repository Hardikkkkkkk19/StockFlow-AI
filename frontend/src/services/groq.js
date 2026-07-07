import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: import.meta.env.VITE_GROQ_API_KEY,
  dangerouslyAllowBrowser: true,
});

export async function askGroq(prompt, inventory = "") {
  const response = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [
      {
        role: "system",
        content: `
You are StockFlow AI.

You are an intelligent inventory management assistant.

Use the inventory data provided below to answer questions accurately.

Inventory:
${inventory}

Never make up products that are not present.
Give short professional answers.
`,
      },
      {
        role: "user",
        content: prompt,
      },
    ],
    temperature: 0.5,
    max_completion_tokens: 600,
  });

  return response.choices[0].message.content;
}