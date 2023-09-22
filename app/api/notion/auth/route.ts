import {NextRequest, NextResponse} from "next/server";
import axios from "axios";
import {supabase as supabaseBypass} from "@/lib/supabase";
import {createRouteHandlerClient} from "@supabase/auth-helpers-nextjs";
import {cookies} from "next/headers";

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

        return await insertToken(data)

    } catch (error: any) {
        return NextResponse.json({error: error.message});
    }

}

const insertToken = async (data: any) => {
    const supabase = createRouteHandlerClient({cookies});

    // Check if we have a session
    const {
        data: {session},
    } = await supabase.auth.getSession();

    if (!session) {
        return NextResponse.json(
            {
                'message': 'no session'
            }
        )
    }

    //check workspace not match with user_id
    const {data: workspace, error: workspaceError} = await supabaseBypass
        .from('integration_notion').select('*').eq('workspace_id', data.workspace_id).single();

    if (workspace) {
        //update
        const {error} = await supabaseBypass.from('integration_notion').update({
            access_token: data.access_token,
            user_id: session.user.id,
            workspace_name: data.workspace_name,
            workspace_icon: data.workspace_icon,
        }).eq('workspace_id', data.workspace_id)
        if (error) {
            console.log(error)
            return NextResponse.json(
                {
                    'message': 'error',
                    'error': error
                })
        }

        return NextResponse.redirect(`${process.env.NEXT_PUBLIC_FRONT_END_URL}/auth/integration?success=true&token=` + data.access_token);
    }

    const {error} = await supabaseBypass.from('integration_notion').insert({
        workspace_id: data.workspace_id,
        access_token: data.access_token,
        user_id: session.user.id,
        workspace_name: data.workspace_name,
        workspace_icon: data.workspace_icon,
    })

    if (error) {
        console.log(error)
        return NextResponse.json(
            {
                'message': 'error',
                'error': error
            })
    }

    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_FRONT_END_URL}/auth/integration?success=true&token=` + data.access_token);
}
