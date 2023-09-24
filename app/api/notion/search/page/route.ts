import { NextRequest, NextResponse } from "next/server";
import { Client } from "@notionhq/client";
import { supabase as supabaseBypass } from "@/lib/supabase";
import { cookies } from "next/headers";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";

export const dynamic = "force-dynamic";
export async function GET(req: NextRequest) {
  try {
    if (req.nextUrl.searchParams.get("workspace_id") === null) {
      return NextResponse.json({ error: "No workspace_id provided" });
    }
    const workspace_id = req.nextUrl.searchParams.get("workspace_id") as string;
    const supabase = createRouteHandlerClient({ cookies });
    //get user id from session
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (!session) {
      return NextResponse.json({
        message: "no session",
      });
    }
    const userId = session.user.id;

    // get access token from decrypted_integration_notion and user id
    const { data: notionIntegration, error } = await supabaseBypass
      .from("decrypted_integration_notion")
      .select("decrypted_access_token")
      .eq("workspace_id", workspace_id)
      .eq("user_id", userId)
      .single();
    if (error) {
      return NextResponse.json({
        message: "error",
        error: error,
      });
    }

    const token = notionIntegration.decrypted_access_token;

    const notion = new Client({
      auth: token,
    });

    //search page
    const searched = await notion.search({
        filter: {
            value: "page",
            property: "object",
        },
    });

    const pages = searched.results;
    console.log(searched);

    const returnData = pages.map((page: any) => {
        return {
            id: page.id,
            title: page?.properties?.title?.title[0]?.plain_text || 'untitle',
            icon: {
                type: page?.icon?.type || 'emoji',
                emoji: page?.icon?.emoji || '📄',
                external: page?.icon?.external?.url || '',
                file: page?.icon?.file?.url || '',
            }
        }
    })

    // return NextResponse.json(
    //     pages.map((page: any) => {
    //         return {
    //             id: page.id,
    //             title: page.properties.title.title[0].plain_text,
    //         }
    //     })
    // )

    return NextResponse.json(returnData);
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}
