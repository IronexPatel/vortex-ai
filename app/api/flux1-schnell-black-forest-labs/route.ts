import { NextResponse } from "next/server";

export async function POST(req: Request): Promise<NextResponse> {
    try {
        const { prompt } = await req.json();

        // ✅ Check if API key is available
        const API_KEY = process.env.TOGETHER_AI_KEY;
        if (!API_KEY) {
            return NextResponse.json(
                { message: "Server misconfiguration: API key is missing." },
                { status: 500 }
            );
        }

        // ✅ Validate user input
        if (!prompt || typeof prompt !== "string" || prompt.trim().length === 0) {
            return NextResponse.json(
                { message: "Invalid input. Please provide a valid prompt." },
                { status: 400 }
            );
        }

        // ✅ AI Model: FLUX.1-Schnell-Free (Black Forest Labs)
        const model = "black-forest-labs/FLUX.1-schnell-Free";

        const body = JSON.stringify({
            model: model,
            prompt: prompt,
            n: 1, // Number of images to generate
            size: "1024x1024", // Image size (adjust if needed)
        });

        // ✅ Call FLUX.1 Image Generation API
        const response = await fetch("https://api.together.xyz/v1/images/generations", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${API_KEY}`,
                "Content-Type": "application/json",
            },
            body: body,
        });

        // ✅ Check if the API response was successful
        if (!response.ok) {
            const errorResponse = await response.json();
            console.error("❌ API Error Response:", errorResponse);
            return NextResponse.json(
                { message: `Error from API: ${errorResponse.message || "Unknown error"}` },
                { status: response.status }
            );
        }

        // ✅ Parse API response
        const data = await response.json();
        console.log("🔍 API Response:", data); // Debugging API response

        // ✅ Ensure API response contains the image URL
        const imageUrl = data?.data?.[0]?.url || null;

        if (!imageUrl) {
            return NextResponse.json(
                { message: "⚠️ Error generating image. API did not return an image." },
                { status: 500 }
            );
        }

        // ✅ Return image URL to the frontend
        return NextResponse.json({ imageUrl: imageUrl });

    } catch (error) {
        console.error("❌ Server Error:", error);
        return NextResponse.json(
            { message: "⚠️ Internal server error. Please try again later." },
            { status: 500 }
        );
    }
}
