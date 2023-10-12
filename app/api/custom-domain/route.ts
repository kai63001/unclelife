import { NextRequest, NextResponse } from "next/server";
import { supabase as supabaseBypass } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const { domain } = body;
  if (domain === null) {
    return NextResponse.json({ error: "No domain provided" });
  }

  try {
    //insert domain to custom domain database
    const { data, error: errorInsert } = await supabaseBypass
      .from("custom_domain")
      .select("mapping,domain")
      .eq("domain", domain)
      .single();
    if (errorInsert) {
      return NextResponse.json({
        message: "error",
        error: errorInsert,
      });
    }

    if (data?.mapping) {
      //check mapping if pathname is / change it to '' mapping is array
      const mapping = data?.mapping;
      const mappingArray = mapping.map((item: any) => {
        if (item.pathname === "/") {
          item.pathname = "";
        }
        return item;
      });
      return NextResponse.json({
        message: "success",
        data: mappingArray,
      });
    } else {
      return NextResponse.json({
        message: "error",
        error: "domain not found",
      });
    }
  } catch (error: any) {
    return NextResponse.json({
      message: "error",
      error: error.response.data,
    });
  }
}
