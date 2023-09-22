import {NextRequest, NextResponse} from "next/server";
import {Client} from "@notionhq/client";
import {supabase as supabaseBypass} from "@/lib/supabase";
import {cookies} from "next/headers";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";

export const dynamic = "force-dynamic";
export async function GET(req: NextRequest) {
    try {
        if (req.nextUrl.searchParams.get("workspace_id") === null) {
            return NextResponse.json({error: "No workspace_id provided"});
        }
        const workspace_id = req.nextUrl.searchParams.get("workspace_id") as string
        const supabase = createRouteHandlerClient({ cookies })
        //get user id from session
        const {
            data: { session },
        } = await supabase.auth.getSession();
        if (!session) {
            return NextResponse.json(
                {
                    'message': 'no session'
                }
            )
        }
        const userId = session.user.id


        // const {data: profile, error} = await supabaseBypass
        //     .from('decrypted_profiles').select('decrypted_provider_token').eq('id', userId).single();
        // if (error) {
        //     return NextResponse.json(
        //         {
        //             'message': 'error',
        //             'error': error
        //         }
        //     )
        // }
        // const token = profile.decrypted_provider_token

        // get access token from decrypted_integration_notion
        const {data: notionIntegration, error} = await supabaseBypass
            .from('decrypted_integration_notion').select('decrypted_access_token').eq('workspace_id', workspace_id).single();
        if (error) {
            return NextResponse.json(
                {
                    'message': 'error',
                    'error': error
                }
            )
        }
        const token = notionIntegration.decrypted_access_token



        const notion = new Client({
            auth: token,
        })

        const searched = await notion.search({
            filter: {
                value: "database",
                property: "object"
            },
        });

        const databases = searched.results;

        return NextResponse.json(
            databases.map((database: any) => {
                return {
                    id: database.id,
                    title: database.title,
                    properties: database.properties,
                    icon: database.icon,
                    description: database.description,
                    url: database.url,
                }
            })
        );
    } catch (error: any) {
        return NextResponse.json({error: error.message});
    }
}

