import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { supabase as supabaseBypass } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
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

  return NextResponse.json({
    token: token,
  });
}
