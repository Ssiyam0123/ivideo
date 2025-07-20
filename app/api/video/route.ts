import { authOptions } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import Video, { IVideo } from "@/models/Video";
import { error } from "console";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    try {
        await connectToDatabase()
        const videos = await Video.find({}).sort({ createdAt: -1 }).lean()

        if (!videos) {
            return NextResponse.json({ error: "cannot load the videos" }, { status: 402 })
        }

        return NextResponse.json(videos)
    } catch (error) {
        return NextResponse.json({
            error: "error while fatching video"
        }, { status: 402 })
    }
}



export async function POST(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions)

        if (!session) {
            return NextResponse.json({ error: "Unauthorize" }, { status: 404 })
        }

        await connectToDatabase()

        const body: IVideo = await request.json()

        if (!body.title ||
            !body.videoUrl ||
            !body.description ||
            !body.thumbnailUrl
        ) {
            return NextResponse.json({ error: "missing required fileds" }, { status: 402 })
        }

        const videoData = {
            ...body,
            controls: body.controls ?? true,
            transformation: {
                height: 1920,
                width: 1080,
                quality: body.transformation?.quality ?? 100
            }
        }

        const newVideo = await Video.create(videoData)
        return NextResponse.json(newVideo)

    } catch (error) {
        return NextResponse.json(
            { error: "Failed to create video" },
            { status: 500 }
        );
    }
}