import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { supabase as supabaseBypass } from "@/lib/supabase";
import {
  convertBodyAndLayerToProperty,
  validateBodyAndLayer,
} from "@/lib/notion";
import { Client } from "@notionhq/client";

export const dynamic = "force-dynamic";
async function parseRequestBody(req: any) {
  const contentType = req.headers.get("content-type");
  console.log(contentType);

  if (
    contentType?.startsWith("multipart/form-data") ||
    contentType?.startsWith("application/x-www-form-urlencoded") ||
    contentType?.startsWith("application/form-data") ||
    contentType?.startsWith("application/x-form-data")
  ) {
    return await req.formData().then((formData: any) => {
      const body: any = {};
      for (const [key, value] of formData.entries()) {
        body[key] = value;
      }
      return body;
    });
  } else {
    return await req.json();
  }
}

export async function POST(
  req: NextRequest,
  route: { params: { id: string } }
) {
  try {
    const form_id = route.params.id;
    const body = await parseRequestBody(req);
    // const { input } = body;
    // if (input === null) {
    //   return NextResponse.json({ error: "No notification provided" });
    // }

    const { data: notionIntegration, error } = await supabaseBypass
      .from("decrypted_form")
      .select("decrypted_access_token, layer,databaseId")
      .eq("id", form_id)
      .single();
    if (error) {
      return NextResponse.json({
        message: "error",
        error: error,
      });
    }

    const token = notionIntegration.decrypted_access_token;
    const layer = notionIntegration.layer;
    const databaseId = notionIntegration.databaseId;
    const validataion = await validateBodyAndLayer(body, layer);
    if (validataion.isRequired) {
      return NextResponse.json({
        message: "error",
        error: validataion.validate,
      });
    }

    const properties = await convertBodyAndLayerToProperty(body, layer);

    // console.log(properties);

    if (properties) {
      const notion = new Client({
        auth: token,
      });

      const response: any = await notion.pages.create({
        parent: {
          database_id: databaseId as string,
        },
        properties: properties,
      });
    }

    return NextResponse.json({
      message: "success",
    });
  } catch (error: any) {
    return NextResponse.json({
      message: "error",
      error: error?.message,
    });
  }
}
