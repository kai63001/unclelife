//convert image to webp wtih sharp and upload to supabase
import {NextRequest, NextResponse} from "next/server";
import sharp from "sharp";
import {supabase} from "@/lib/supabase";

export async function POST(req: NextRequest) {
    if (req.nextUrl.searchParams.get("id") === null) {
        return NextResponse.json({error: "No id provided"});
    }

    const body = await req.json();
    const {imageBase64} = body;
    //check file type
    if (!imageBase64.startsWith('data:image')) {
        return NextResponse.json({error: "Invalid file type"});
    }
    const uri = imageBase64.split(';base64,').pop();
    //convert image
    const webpBase64 = await sharp(Buffer.from(uri, 'base64'))
        .webp({
            quality: 80,
            lossless: false,
        })
        .toBuffer()
        .then((data) => {
            return data.toString('base64')
        })
    //upload to supabase storage
    const {
        error
    } = await supabase.storage.from('cover').upload(`cover-form-${req.nextUrl.searchParams.get("id")}.webp`, Buffer.from(webpBase64, 'base64'), {
        cacheControl: '3600',
        upsert: true,
        contentType: 'image/webp',
    })
    if (error) {
        return NextResponse.json({error: error.message});
    }
    const publicURL = supabase.storage.from('cover').getPublicUrl(`cover-form-${req.nextUrl.searchParams.get("id")}.webp`)

    return NextResponse.json({
        data: {
            publicURL: publicURL.data.publicUrl + '?cache=' + Date.now()
        }
    });


}
