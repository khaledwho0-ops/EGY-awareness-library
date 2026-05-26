import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { threatText } = body;

    if (!threatText) {
      return NextResponse.json({ error: 'Provide threatText to analyze' }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'Gemini API key is missing' }, { status: 500 });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `You are an expert in theology, historical texts, and trauma-informed care. The user has encountered an existential threat, misinformation, or ontological shock. 
    Provide an authentic, trauma-informed counter-narrative and a grounding truth based on historical or theological baselines.
    Respond ONLY with a JSON object in this exact format:
    {
      "shockLevelDetected": number (0-10),
      "historicalBaseline": "string (a verified historical or theological fact that counters the threat)",
      "groundingTruth": "string (a trauma-informed counter-narrative to calm the user)",
      "suggestedAction": "string"
    }
    
    Threat encountered: "${threatText}"`;

    const result = await model.generateContent(prompt);
    const resultString = result.response.text();
    
    // Strip markdown formatting if Gemini includes it
    const cleanJson = resultString.replace(/```json|```/g, '').trim();
    const analysis = JSON.parse(cleanJson);

    return NextResponse.json({
      success: true,
      analysis,
    });
  } catch (error: any) {
    console.error('Religion Hub API Error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
