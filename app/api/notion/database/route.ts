import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { Client } from "@notionhq/client";

export async function GET(req: NextRequest) {
  const notion = new Client({
    auth: process.env.NEXT_PUBLIC_NOTION_SECRET_KEY,
  });
  // ee18e4c2e30d47da81fdcc3a609a4dee
  const response: any = await notion.databases.query({
    database_id: "ee18e4c2e30d47da81fdcc3a609a4dee",
    //filter only properties
    page_size: 0,
  });
  const properties = response.results[0].properties;
  let propertiesList: any[] = [];
  if (properties) {
    Object.entries(properties).forEach(async ([propertyName, propertyValue]: any) => {
      await propertiesList.push({
        name: propertyName,
        type: propertyValue.type,
      });
    });
  }

  //get only properties

  return NextResponse.json(await propertiesList);
}
