import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided in the form data.' },
        { status: 400 }
      );
    }

    const MAX_FILE_SIZE = 10 * 1024 * 1024;
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: 'File exceeds the maximum limit of 10MB.' },
        { status: 400 }
      );
    }

    const validMimeTypes = ['image/jpeg', 'image/png', 'image/webp', 'video/mp4', 'video/quicktime'];
    if (!validMimeTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Unsupported file type. Please upload a valid image or video.' },
        { status: 400 }
      );
    }

    const apiUser = process.env.SIGHTENGINE_API_USER;
    const apiSecret = process.env.SIGHTENGINE_API_SECRET;

    if (!apiUser || !apiSecret) {
      return NextResponse.json(
        { error: 'Deepfake analysis API keys are missing in the server environment.' },
        { status: 500 }
      );
    }

    const sightengineFormData = new FormData();
    sightengineFormData.append('media', file);
    sightengineFormData.append('models', 'deepfake');
    sightengineFormData.append('api_user', apiUser);
    sightengineFormData.append('api_secret', apiSecret);

    const response = await fetch('https://api.sightengine.com/1.0/check.json', {
      method: 'POST',
      body: sightengineFormData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      let parsedError = errorText;
      try {
        const parsed = JSON.parse(errorText);
        parsedError = parsed.message || parsed.error?.message || errorText;
      } catch { /* JSON parse fallback — use raw text */ }
      
      throw new Error(`Sightengine Error (${response.status}): ${parsedError}`);
    }

    const data = await response.json();

    return NextResponse.json({
      success: true,
      analysis: data,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Internal Server Error';
    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}
