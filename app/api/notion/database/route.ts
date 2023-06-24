import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { Client } from "@notionhq/client";

export async function GET(req: NextRequest) {
  const notion = new Client({
    auth: process.env.NEXT_PUBLIC_NOTION_SECRET_KEY,
  });
  // ee18e4c2e30d47da81fdcc3a609a4dee
  const response = await notion.databases.query({
    database_id: "ee18e4c2e30d47da81fdcc3a609a4dee",
  });
  console.log(response);

  return NextResponse.json(response);
}
