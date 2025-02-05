import { NextResponse } from "next/server";

export async function POST(req: Request): Promise<NextResponse> {
    try {
        const { prompt } = await req.json();

        // Check if API key is available
        const API_KEY = process.env.TOGETHER_AI_KEY;
        if (!API_KEY) {
            return NextResponse.json(
                { message: "Server misconfiguration: API key is missing." },
                { status: 500 }
            );
        }

        // Validate user input
        if (!prompt || typeof prompt !== "string" || prompt.trim().length === 0) {
            return NextResponse.json(
                { message: "Invalid input. Please provide a valid prompt." },
                { status: 400 }
            );
        }

        // API request payload
        const model = "meta-llama/Llama-Vision-Free";
        const body = JSON.stringify({
            model: model,
            messages: [{ role: "user", content: prompt }],
        });

        // Call Together AI API
        const response = await fetch("https://api.together.xyz/v1/chat/completions", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${API_KEY}`,
                "Content-Type": "application/json",
            },
            body: body,
        });

        if (!response.ok) {
            return NextResponse.json(
                { message: `API Error: ${response.statusText}` },
                { status: response.status }
            );
        }

        const data = await response.json();

        // Extract AI response safely
        const aiResponse = data?.choices?.[0]?.message?.content || "No response from AI.";

        return NextResponse.json({ message: aiResponse });
    } catch (error) {
        console.error("Server Error:", error);
        return NextResponse.json(
            { message: "Internal server error. Please try again later." },
            { status: 500 }
        );
    }
}
