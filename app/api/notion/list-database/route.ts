import { NextRequest, NextResponse } from "next/server";
import { Client } from "@notionhq/client";
import { cookies } from "next/headers";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { supabase as supabaseBypass } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  if (req.nextUrl.searchParams.get("database_id") === null) {
    return NextResponse.json({ error: "No database_id provided" });
  }

  if (req.nextUrl.searchParams.get("id") === null) {
    return NextResponse.json({ error: "No id provided" });
  }

  const supabase = createRouteHandlerClient({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (!session) {
    return NextResponse.json({
      message: "no session",
    });
  }
  const userId = session.user.id;
  const databaseId = req.nextUrl.searchParams.get("database_id") as string;
  const id = req.nextUrl.searchParams.get("id") as string;

  const { data: notionIntegration, error }: any = await supabaseBypass
    .from("decrypted_form")
    .select("decrypted_access_token,user_id (is_subscribed)")
    .eq("id", id)
    .eq("user_id", userId)
    .eq("databaseId", databaseId)
    .single();

  if (error) {
    return NextResponse.json({
      message: "error",
      error: error,
    });
  }

  const token = notionIntegration.decrypted_access_token;
  const pageSize = notionIntegration.user_id.is_subscribed ? 100 : 1;

  try {
    const id = req.nextUrl.searchParams.get("id") as string;

    const notion = new Client({
      auth: token,
    });

    const response: any = await notion.databases
      .query({
        database_id: databaseId.trim().toString(),
        page_size: pageSize,
      })
      .catch((error) => {
        console.log(error);
      });

    const properties = response.results.map((item: any) => {
      return {
        id: item.id,
        properties: item.properties,
      };
    });

    return NextResponse.json({
      list: properties,
      message: "success",
      hasMore: response.has_more,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}
