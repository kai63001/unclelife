import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { supabase as supabaseBypass } from "@/lib/supabase";
import { addCustomDomain, deleteCustomDomain } from "@/lib/renderApi";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { formId } = body;

    //check user is enterpise or not from form database
    const { data: form, error: errorForm }: any = await supabaseBypass
      .from("form")
      .select("user_id (is_enterprise)")
      .eq("id", formId)
      .single();

    if (errorForm) {
      return NextResponse.json({
        message: "error",
        error: errorForm,
      });
    }

    if (!form) {
      return NextResponse.json({
        message: "error",
        error: "form not found",
      });
    }

    const is_enterprise = form?.user_id?.is_enterprise;

    return NextResponse.json({
      message: "success",
      is_enterprise: is_enterprise,
    });
  } catch (error) {
    return NextResponse.json({
      message: "error",
      error: error,
    });
  }
}
