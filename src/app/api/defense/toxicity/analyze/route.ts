import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { text } = body;

    if (!text) {
      return NextResponse.json({ error: 'Provide text to analyze' }, { status: 400 });
    }

    const apiKey = process.env.HUGGINGFACE_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'Hugging Face API key is missing' }, { status: 500 });
    }

    const response = await fetch(
      'https://api-inference.huggingface.co/models/SamLowe/roberta-base-go_emotions',
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ inputs: text }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Hugging Face API Error:', errorText);
      throw new Error(`Hugging Face responded with status ${response.status}`);
    }

    const data = await response.json();
    
    // The model returns an array of arrays containing objects like { label: 'joy', score: 0.9 }
    // e.g. [[ { label: "admiration", score: 0.8 }, { label: "joy", score: 0.1 } ]]
    const predictions = Array.isArray(data) && Array.isArray(data[0]) ? data[0] : [];
    
    // Sort by score descending and take the top 3
    const topEmotions = predictions
      .sort((a: any, b: any) => b.score - a.score)
      .slice(0, 3)
      .map((p: any) => ({
        emotion: p.label,
        confidence: Math.round(p.score * 100) + '%'
      }));

    return NextResponse.json({
      success: true,
      analysis: {
        topEmotions,
        rawResults: topEmotions, // Passing it back for UI to display easily
      }
    });

  } catch (error: any) {
    console.error('Toxicity Analysis API Error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
