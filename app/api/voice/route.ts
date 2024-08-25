import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import { checkApiLimit, increaseApiLimit } from '@/lib/api-limit';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(
    req: Request
) {
    try {
        
        const { userId } = auth();
        const body = await req.json();
        const { prompt } = body;

        if(!userId) {
            return new NextResponse("Unauthorized", {status: 401});
        }

        if(!process.env.OPENAI_API_KEY) {
            return new NextResponse("OpenAI API Key not configured", { status:500 });
        }

        if(!prompt) {
            return new NextResponse("Prompt is required", {status:400});
        }

        const freeTrial = await checkApiLimit();

        if(!freeTrial) {
            return new NextResponse("Free tial has expired.", {status: 403});
        }

        const response = await openai.audio.speech.create({
            model: "tts-1",
            voice: "alloy",
            input: prompt,
            response_format: "mp3",
          });
      
          const buffer = Buffer.from(await response.arrayBuffer());

          await increaseApiLimit();

          return new NextResponse(buffer, {
            headers: {
              'Content-Type': 'audio/mpeg',
              'Content-Disposition': `attachment; filename="audio_${Date.now()}.mp3"`,
            },
          });

    } catch (error) {
        console.log("[VOICE_ERROR]", error);
        return new NextResponse("Internal error", { status: 500 });
        
    }
}