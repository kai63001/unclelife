import {NextRequest, NextResponse} from "next/server";
import {Client} from "@notionhq/client";
import {cookies} from "next/headers";
import {supabase as supabaseBypass} from "@/lib/supabase";

export async function GET(req: NextRequest) {
    try {
        const userId = cookies().get('userId')?.value

        const {data: profile, error} = await supabaseBypass
            .from('decrypted_profiles').select('decrypted_provider_token').eq('id', userId).single();
        if (error) {
            return NextResponse.json(
                {
                    'message': 'error',
                    'error': error
                }
            )
        }
        const token = profile.decrypted_provider_token

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

export async function PUT(req: NextRequest) {
    if (req.nextUrl.searchParams.get("id") === null) {
        return NextResponse.json({error: "No id provided"});
    }

    const body = await req.json();
    const properties = body.properties;

    try {
        const notion = new Client({
            auth: process.env.NEXT_PUBLIC_NOTION_SECRET_KEY,
        });
        const response: any = await notion.pages.create({
            parent: {
                database_id: req.nextUrl.searchParams.get("id") as string,
            },
            properties: properties,
        });

        return NextResponse.json(await response);
    } catch (error: any) {
        return NextResponse.json({error: error.message});
    }
}
