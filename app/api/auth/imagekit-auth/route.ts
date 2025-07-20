// File: app/api/upload-auth/route.ts
import { getUploadAuthParams } from "@imagekit/next/server"

export async function GET() {


    try {
        const imageKitParams = getUploadAuthParams({
            privateKey: process.env.IMAGEKIT_PRIVATE_KEY as string,
            publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_KEY as string,

        })

        return Response.json({ imageKitParams, publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_KEY })
    } catch (error) {
        return Response.json({
            error: "authintication filed for imagekit"
        },
            { status: 400 }
        )
    }
}