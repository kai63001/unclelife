import { NextRequest, NextResponse } from "next/server";
import { Client } from "@notionhq/client";
import { cookies } from "next/headers";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { supabase as supabaseBypass } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  if (req.nextUrl.searchParams.get("id") === null) {
    return NextResponse.json({ error: "No id provided" });
  }
  //workspace_id
  if (req.nextUrl.searchParams.get("workspace_id") === null) {
    return NextResponse.json({ error: "No workspace_id provided" });
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
  const workspace_id = req.nextUrl.searchParams.get("workspace_id") as string;

  const { data: notionIntegration, error } = await supabaseBypass
    .from("decrypted_integration_notion")
    .select("decrypted_access_token")
    .eq("user_id", userId)
    .eq("workspace_id", workspace_id)
    .single();
  if (error) {
    return NextResponse.json({
      message: "error",
      error: error,
    });
  }

  const token = notionIntegration.decrypted_access_token;

  try {
    const id = req.nextUrl.searchParams.get("id") as string;

    const notion = new Client({
      auth: token,
    });

    const response: any = await notion.databases
      .retrieve({
        database_id: id.trim().toString(),
      })
      .catch((error) => {
        console.log(error);
      });

    const properties = response.properties;

    return NextResponse.json(await properties);
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}

export async function PUT(req: NextRequest) {
  if (req.nextUrl.searchParams.get("id") === null) {
    return NextResponse.json({ error: "No id provided" });
  }

  if (req.nextUrl.searchParams.get("userid") === null) {
    return NextResponse.json({ error: "No userId provided" });
  }

  const body = await req.json();
  const properties = body.properties;
  const form_id = body.form_id;
  if (properties === null) {
    return NextResponse.json({ error: "No properties provided" });
  }
  if (form_id === null) {
    return NextResponse.json({ error: "No form_id provided" });
  }

  const userId = req.nextUrl.searchParams.get("userid") as string;
  const { data: notionIntegration, error } = await supabaseBypass
    .from("decrypted_form")
    .select("decrypted_access_token")
    .eq("user_id", userId)
    .eq("id", form_id)
    .single();
  if (error) {
    return NextResponse.json({
      message: "error",
      error: error,
    });
  }

  const token = notionIntegration.decrypted_access_token;
  // console.log("token",token);

  try {
    const notion = new Client({
      auth: token,
    });

    const response: any = await notion.pages.create({
      parent: {
        database_id: req.nextUrl.searchParams.get("id") as string,
      },
      properties: properties,
    });

    return NextResponse.json(await response);
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}
