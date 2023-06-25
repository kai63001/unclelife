import { NextRequest, NextResponse } from "next/server";
import { Client } from "@notionhq/client";

export async function GET(req: NextRequest) {
  if (req.nextUrl.searchParams.get("id") === null) {
    return NextResponse.json({ error: "No id provided" });
  }
  try {
    const notion = new Client({
      auth: process.env.NEXT_PUBLIC_NOTION_SECRET_KEY,
    });
    const response: any = await notion.databases.query({
      database_id: req.nextUrl.searchParams.get("id") as string,
      page_size: 0,
    });
    const properties = response.results[0].properties;

    return NextResponse.json(await properties);
  } catch (error:any) {
    return NextResponse.json({ error: error.message });
  }
}
