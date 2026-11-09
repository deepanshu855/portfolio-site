import { NextRequest, NextResponse } from "next/server";
import { resumeFacts } from "@/lib/portfolio-data";

export const runtime = "nodejs";

type ChatMessage = { role: "user" | "assistant"; content: string };

export async function POST(request: NextRequest) {
  let messages: ChatMessage[];
  try {
    const payload = await request.json() as { messages?: ChatMessage[] };
    if (!Array.isArray(payload.messages) || payload.messages.length > 8) {
      return NextResponse.json({ reply: "Please send a shorter conversation and try again." }, { status: 400 });
    }
    messages = payload.messages.filter((item) =>
      item && (item.role === "user" || item.role === "assistant") && typeof item.content === "string" && item.content.length <= 500,
    );
  } catch {
    return NextResponse.json({ reply: "That message couldn’t be read. Please try again." }, { status: 400 });
  }

  const endpoint = process.env.CHAT_API_URL;
  const key = process.env.CHAT_API_KEY;
  const model = process.env.CHAT_MODEL;
  if (!endpoint || !key || !model) {
    return NextResponse.json({ reply: "The portfolio assistant is ready for questions, but its AI endpoint has not been connected yet. Please email Deepanshu at deepanshusharma040@gmail.com." });
  }

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${key}` },
      body: JSON.stringify({
        model,
        temperature: 0.3,
        messages: [
          { role: "system", content: `You are Deepanshu Sharma's portfolio assistant. Answer concise recruiter questions using only these facts. If a fact or project link is not present, say it is not listed and suggest emailing Deepanshu. Do not invent credentials, outcomes, or URLs.\n\n${resumeFacts}` },
          ...messages,
        ],
      }),
      signal: AbortSignal.timeout(15_000),
      cache: "no-store",
    });
    if (!response.ok) throw new Error(`Chat provider returned ${response.status}`);
    const data = await response.json() as { choices?: { message?: { content?: string } }[] };
    const reply = data.choices?.[0]?.message?.content;
    if (!reply) throw new Error("Chat provider returned no message");
    return NextResponse.json({ reply });
  } catch {
    return NextResponse.json({ reply: "I couldn’t reach the assistant service just now. Please email Deepanshu at deepanshusharma040@gmail.com." }, { status: 502 });
  }
}
