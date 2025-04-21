// app/api/chat/route.ts

import OpenAI from "openai";
import { NextRequest, NextResponse } from "next/server";
import { personas } from "@/lib/persona";

const openai = new OpenAI({
  apiKey: process.env.GEMINI_API_KEY,
  baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/"
});

export async function POST(request: NextRequest) {
  try {
    const { messages, persona = "custom" } = await request.json();

    const systemMessage = personas[persona]?.systemMessage || personas.custom.systemMessage;

    const response = await openai.chat.completions.create({
      model: "gemini-2.0-flash",
      messages: [
        { role: "system", content: systemMessage },
        ...messages,
      ],max_tokens: 500
    });

    return NextResponse.json(response.choices[0].message);
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
