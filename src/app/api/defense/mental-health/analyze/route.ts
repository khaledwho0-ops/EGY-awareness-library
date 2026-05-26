import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { text } = body;

    if (!text) {
      return NextResponse.json({ error: 'Provide text to analyze' }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'Gemini API key is missing' }, { status: 500 });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `You are a clinical psychology API expert. Analyze the provided text for manipulative sentiment, cognitive bias, and dark persuasion patterns. 
    Respond ONLY with a JSON object in this exact format:
    {
      "cognitiveLoadScore": number (0-100),
      "manipulationDetected": boolean,
      "detectedBiases": ["string"],
      "darkPatterns": ["string"],
      "analysisSummary": "string (2-3 sentences)"
    }
    
    Text to analyze:
    "${text}"`;

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
    console.error('Mental Health API Error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
