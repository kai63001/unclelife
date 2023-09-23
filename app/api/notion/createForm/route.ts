import { NextRequest, NextResponse } from "next/server";
import { Client } from "@notionhq/client";

const notion = new Client({ auth: process.env.NOTION_API_KEY });

export async function PUT(req: NextRequest) {
  try {
    const { pageId } = await req.json();

    // Create a new database
    const databaseResponse = await notion.databases.create({
      parent: {
        page_id: pageId,
      },
      title: [
        {
          type: "text",
          text: {
            content: "Grocery List",
            link: null,
          },
        },
      ],
      properties: {
        Name: {
          title: {},
        },
      },
    });

    console.log("Database created:", databaseResponse);

    return NextResponse.json({
      message: "Database created",
      database: databaseResponse,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      message: "error",
      error: error,
    });
  }
}
