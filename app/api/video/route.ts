import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(req: Request) {
    try {
        const { userId } = auth();
        const body = await req.json();
        const { prompt } = body;

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        if (!prompt) {
            return new NextResponse("Prompt is required", { status: 400 });
        }

        const response = await axios.post(
            'https://modelslab.com/api/v6/video/text2video',
            {
                "key":"",
                "model_id":"zeroscope",
                "prompt":"An astronaut riding a horse",
                "negative_prompt":"low quality",
                "height":320,
                "width":576,
                "num_frames":16,
                "num_inference_steps":20,
                "guidance_scale":7,
                "upscale_height":640,
                "upscale_width":1024,
                "upscale_strength":0.6,
                "upscale_guidance_scale":12,
                "upscale_num_inference_steps":20,
                "output_type":"gif",
                "webhook":null,
                "track_id":null
            },
            {
                headers: {
                    'Content-Type': 'application/json'
                },
                responseType: 'arraybuffer',
            }
        );

        const buffer = Buffer.from(response.data);

        return new NextResponse(buffer, {
            headers: {
                'Content-Type': 'video/mp4',
                'Content-Disposition': `attachment; filename="video_${Date.now()}.mp4"`,
            },
        });

    } catch (error) {
        console.log("[VIDEO_ERROR]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}
