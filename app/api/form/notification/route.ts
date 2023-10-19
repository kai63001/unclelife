import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { supabase as supabaseBypass } from "@/lib/supabase";
import { addCustomDomain, deleteCustomDomain } from "@/lib/renderApi";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { formId, notification } = body;
    if (formId === null) {
      return NextResponse.json({ error: "No formId provided" });
    }
    if (notification === null) {
      return NextResponse.json({ error: "No notification provided" });
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

    const { data: form, error } = await supabaseBypass
      .from("form")
      .upsert({
        id: formId,
        notification: notification,
      })
      .eq("user_id", userId)
      .eq("id", formId)
      .select("id");
    if (error) {
      return NextResponse.json({
        message: "error",
        error: error,
      });
    }

    return NextResponse.json({
      message: "success",
      form,
    });
  } catch (error) {
    return NextResponse.json({
      message: "error",
      error: error,
    });
  }
}
