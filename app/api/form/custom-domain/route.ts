import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { supabase as supabaseBypass } from "@/lib/supabase";
import { addCustomDomain, deleteCustomDomain } from "@/lib/renderApi";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
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

    //insert to form database
    const { data, error: errorInsert } = await supabaseBypass
      .from("custom_domain")
      .select()
      .eq("user_id", userId);

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

    console.log("add custom domain to render", domain);

    const addCustomDomainToRender = await addCustomDomain(domain);
    console.log(addCustomDomainToRender);
    const domain_id = addCustomDomainToRender[0].id;
    //insert domain to custom domain database
    const { data, error: errorInsert } = await supabaseBypass
      .from("custom_domain")
      .insert([
        {
          user_id: userId,
          domain: domain,
          domain_id: domain_id,
        },
      ])
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
  } catch (error: any) {
    return NextResponse.json({
      message: "error",
      error: error.response.data,
    });
  }
}

export async function DELETE(req: NextRequest) {
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

    //delete domain to render
    const deleteCustomDomainToRender = await deleteCustomDomain(domain);
    console.log(deleteCustomDomainToRender);

    //insert to form database
    const { data, error: errorInsert } = await supabaseBypass
      .from("custom_domain")
      .delete()
      .eq("user_id", userId)
      .eq("domain_id", domain)
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
