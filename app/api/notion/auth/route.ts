import {NextRequest, NextResponse} from "next/server";
import axios from "axios";

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
    if (req.nextUrl.searchParams.get("code") === null) {
        return NextResponse.json({error: "No code provided"});
    }
    const code = req.nextUrl.searchParams.get("code") as string

    try {
        const client_id = process.env.NEXT_PUBLIC_NOTION_CLIENT_ID;
        const client_secret = process.env.NEXT_PUBLIC_NOTION_CLIENT_SECRET;

        const {data} = await axios.post('https://api.notion.com/v1/oauth/token', {
            grant_type: 'authorization_code',
            code: code,
            redirect_uri: process.env.NEXT_PUBLIC_FRONT_END_URL + '/api/notion/auth',
        }, {
            headers: {
                Accept: "application/json",
                'Content-Type': 'application/json',
                Authorization: `Basic ${Buffer.from(`${client_id}:${client_secret}`).toString('base64')}`,
            }
        })

        console.log(data)

        return NextResponse.redirect(`${process.env.NEXT_PUBLIC_FRONT_END_URL}/auth/integration?success=true&token=` + data.access_token);
    } catch (error: any) {
        return NextResponse.json({error: error.message});
    }

}
