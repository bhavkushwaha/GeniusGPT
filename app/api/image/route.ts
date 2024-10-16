import { checkApiLimit, increaseApiLimit } from '@/lib/api-limit';
import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(
    req: Request
) {
    try {
        
        const { userId } = auth();
        const body = await req.json();
        const { prompt, amount = 1, resolution = "1024x1024" } = body;

        if(!userId) {
            return new NextResponse("Unauthorized", {status: 401});
        }

        if(!process.env.OPENAI_API_KEY) {
            return new NextResponse("OpenAI API Key not configured", { status:500 });
        }

        if(!prompt) {
            return new NextResponse("Prompt is required", {status:400});
        }


        if(!amount) {
            return new NextResponse("Amount is required", {status:400});
        }

        if(!resolution) {
            return new NextResponse("Resolution is required", {status:400});
        }

        const freeTrial = await checkApiLimit();

        if(!freeTrial) {
            return new NextResponse("Free tial has expired.", {status: 403});
        }

        const response = await openai.images.generate({
            model: "dall-e-3",
            prompt: prompt,
            n: 1,
            size: resolution,
        })

        await increaseApiLimit();

        return NextResponse.json(response.data[0].url);

    } catch (error) {
        console.log("[IMAGE_ERROR]", error);
        return new NextResponse("Internal error", { status: 500 });
        
        
    }
}