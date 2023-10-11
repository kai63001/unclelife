import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { supabase as supabaseBypass } from "@/lib/supabase";
import { retrieveCustomDomain, verifyCustomDomain } from "@/lib/renderApi";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const { domain } = body;
  if (domain === null) {
    return NextResponse.json({ error: "No domain provided" });
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

    // render verify domain
    const dataVerify = await verifyCustomDomain(domain);
    const retriveCustomDomain = await retrieveCustomDomain(domain);
    if (retriveCustomDomain?.verificationStatus === "unverified") {
      return NextResponse.json({
        message: "error",
        error: "domain not verified",
      });
    }

    //insert domain to custom domain database
    const { data, error: errorInsert } = await supabaseBypass
      .from("custom_domain")
      .update({
        verify: true,
      })
      .eq("user_id", userId)
      .eq("domain_id", domain);
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
  } catch (error: any) {
    return NextResponse.json({
      message: "error",
      error: error.response.data,
    });
  }
}
