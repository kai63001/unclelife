import { NextRequest, NextResponse } from "next/server";
import { Client } from "@notionhq/client";
import { supabase as supabaseBypass } from "@/lib/supabase";
import { cookies } from "next/headers";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";

export const dynamic = "force-dynamic";
export async function POST(req: NextRequest) {
  try {
    const { pageId, workspaceId, properties, title } = await req.json();
    if (pageId === null) {
      return NextResponse.json({ error: "No pageId provided" });
    }
    if (workspaceId === null) {
      return NextResponse.json({ error: "No workspaceId provided" });
    }
    if (properties === null) {
      return NextResponse.json({ error: "No properties provided" });
    }
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


    // get access token from decrypted_integration_notion and user id
    const {data: notionIntegration, error} = await supabaseBypass
        .from('decrypted_integration_notion').select('decrypted_access_token').eq('workspace_id', workspaceId).eq('user_id',userId).single();
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

    // Create a new database
    const databaseResponse = await notion.databases.create({
      parent: {
        page_id: pageId,
      },
      title: [
        {
          type: "text",
          text: {
            content: `${title} [UncleLife.co]` || "Untitled",
            link: null,
          },
        },
      ],
      properties: properties,
    });

    console.log("Database created:", databaseResponse);
    const databaseId = databaseResponse.id;

    return NextResponse.json({
      message: "Database created",
      databaseId: databaseId,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      message: "error",
      error: error,
    });
  }
}
