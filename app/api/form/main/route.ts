import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { supabase as supabaseBypass } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const {
    workspaceId,
    layer,
    user_id,
    detail,
    databaseId,
    logic,
    notification,
  } = body;
  if (workspaceId === null) {
    return NextResponse.json({ error: "No workspaceId provided" });
  }
  if (layer === null) {
    return NextResponse.json({ error: "No layer provided" });
  }
  if (user_id === null) {
    return NextResponse.json({ error: "No user_id provided" });
  }
  if (detail === null) {
    return NextResponse.json({ error: "No detail provided" });
  }
  if (databaseId === null) {
    return NextResponse.json({ error: "No databaseId provided" });
  }

  try {
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

    const { data: notionIntegration, error } = await supabaseBypass
      .from("decrypted_integration_notion")
      .select("decrypted_access_token")
      .eq("user_id", userId)
      .eq("workspace_id", workspaceId)
      .single();
    if (error) {
      return NextResponse.json({
        message: "error",
        error: error,
      });
    }

    const token = notionIntegration.decrypted_access_token;

    //insert to form database
    const { data, error: errorInsert } = await supabaseBypass
      .from("form")
      .insert([
        {
          user_id: userId,
          layer: layer,
          detail: detail,
          databaseId: databaseId,
          access_token: token,
          logic: logic,
          notification,
        },
      ])
      .select("id")
      .single();

    if (errorInsert) {
      return NextResponse.json({
        message: "error",
        error: errorInsert,
      });
    }

    return NextResponse.json({
      message: "success",
      data: data,
    });
  } catch (error) {
    return NextResponse.json({
      message: "error",
      error: error,
    });
  }
}

export async function PUT(req: NextRequest) {
  const body = await req.json();

  const { id, detail, layer, logic, notification } = body;
  if (layer === null) {
    return NextResponse.json({ error: "No layer provided" });
  }
  if (detail === null) {
    return NextResponse.json({ error: "No detail provided" });
  }
  if (id === null) {
    return NextResponse.json({ error: "No id provided" });
  }
  try {
    const supabase = createRouteHandlerClient({ cookies });
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (!session) {
      return NextResponse.json({
        message: "no session",
      });
    }

    //check if user is owner
    const userId = session.user.id;
    const { data: form, error } = await supabaseBypass
      .from("form")
      .select("user_id")
      .eq("id", id)
      .single();
    if (error) {
      return NextResponse.json({
        message: "error",
        error: error,
      });
    }
    if (form.user_id !== userId) {
      return NextResponse.json({
        message: "error",
        error: "user not owner",
      });
    }

    //insert to form database
    const { data, error: errorInsert } = await supabaseBypass
      .from("form")
      .upsert({
        id: id,
        detail: detail,
        layer: layer,
        logic,
        notification,
      })
      .select();

    if (errorInsert) {
      return NextResponse.json({
        message: "error",
        error: errorInsert,
      });
    }

    return NextResponse.json({
      message: "success",
      data: data,
    });
  } catch (error) {
    return NextResponse.json({
      message: "error",
      error: error,
    });
  }
}
