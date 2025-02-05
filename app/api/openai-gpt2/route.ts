import { NextResponse } from "next/server";

export async function POST(req: Request): Promise<NextResponse> {
    try {
        const { prompt } = await req.json();

        // Validate user input
        if (!prompt || typeof prompt !== "string" || prompt.trim().length === 0) {
            return NextResponse.json(
                { message: "Invalid input. Please provide a valid prompt." },
                { status: 400 }
            );
        }

        // Hugging Face API Key
        const HF_API_KEY = process.env.HUGGINGFACE_API_KEY;
        if (!HF_API_KEY) {
            return NextResponse.json(
                { message: "Server misconfiguration: API key is missing." },
                { status: 500 }
            );
        }

        // Hugging Face API request for GPT-2
        const response = await fetch("https://api-inference.huggingface.co/models/openai-community/gpt2", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${HF_API_KEY}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ inputs: prompt }),
        });

        if (!response.ok) {
            return NextResponse.json(
                { message: `API Error: ${response.statusText}` },
                { status: response.status }
            );
        }

        const data = await response.json();

        // Extract AI response safely
        const aiResponse = data?.[0]?.generated_text || "No response from AI.";

        return NextResponse.json({ message: aiResponse });
    } catch (error) {
        console.error("Server Error:", error);
        return NextResponse.json(
            { message: "Internal server error. Please try again later." },
            { status: 500 }
        );
    }
}
