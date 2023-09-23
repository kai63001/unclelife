import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { supabase as supabaseBypass } from "@/lib/supabase";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  if (req.nextUrl.searchParams.get("code") === null) {
    return NextResponse.json({ error: "No code provided" });
  }
  const code = req.nextUrl.searchParams.get("code") as string;

  try {
    const client_id = process.env.NEXT_PUBLIC_NOTION_CLIENT_ID;
    const client_secret = process.env.NEXT_PUBLIC_NOTION_CLIENT_SECRET;

    const { data } = await axios.post(
      "https://api.notion.com/v1/oauth/token",
      {
        grant_type: "authorization_code",
        code: code,
        redirect_uri:
          process.env.NEXT_PUBLIC_FRONT_END_URL + "/api/notion/auth",
      },
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Basic ${Buffer.from(
            `${client_id}:${client_secret}`
          ).toString("base64")}`,
        },
      }
    );

    return await insertToken(data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}

const insertToken = async (data: any) => {
  const supabase = createRouteHandlerClient({ cookies });

  // Check if we have a session
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    return NextResponse.json({
      message: "no session",
    });
  }

  //get subscription from profile table
  const {
    data: { is_subscribed },
    error: profileError,
  }: any = await supabaseBypass
    .from("profiles")
    .select("is_subscribed")
    .eq("id", session.user.id)
    .single();

  if (profileError) {
    console.log(profileError);
    return NextResponse.json({
      message: "error",
      error: profileError,
    });
  }

  //check workspace not match with user_id
  const { data: workspace, error: workspaceError } = await supabaseBypass
    .from("integration_notion")
    .select("*")
    .eq("workspace_id", data.workspace_id)
    .single();

  // if (workspaceError) {
  //   console.log(workspaceError,84);
  //   return NextResponse.json({
  //     message: "error",
  //     error: workspaceError,
  //   });
  // }
  if (workspace && workspace.user_id !== session.user.id && !is_subscribed) {
    // return NextResponse.json({
    //   message: "error",
    //   error: "Workspace already integrated with another user",
    // });
    return NextResponse.redirect(
      `${
        process.env.NEXT_PUBLIC_FRONT_END_URL
      }/auth/integration?message=${"Workspace already integrated with another user. Please upgrade to premium to integrate with multiple workspaces"}`
    );
  }

  //check if not subscribed can only integrate one workspace
  if (!is_subscribed) {
    const { data: workspaceCount, error: workspaceCountError } =
      await supabaseBypass
        .from("integration_notion")
        .select("workspace_id")
        .eq("user_id", session.user.id)
        .single();

    if (workspaceCountError) {
      console.log(workspaceCountError,112);
      return NextResponse.json({
        message: "error",
        error: workspaceCountError,
      });
    }
    if (workspaceCount && workspaceCount.workspace_id !== data.workspace_id) {
      // return NextResponse.json({
      //   message: "error",
      //   error: "Workspace already integrated with another user",
      // });
      return NextResponse.redirect(
        `${
          process.env.NEXT_PUBLIC_FRONT_END_URL
        }/auth/integration?message=${"You can only integrate one workspace. Please upgrade to premium to integrate with multiple workspaces"}`
      );
    }
  }

  if (workspace) {
    //update
    const { error } = await supabaseBypass
      .from("integration_notion")
      .update({
        access_token: data.access_token,
        user_id: session.user.id,
        workspace_name: data.workspace_name,
        workspace_icon: data.workspace_icon,
      })
      .eq("workspace_id", data.workspace_id);
    if (error) {
      console.log(error);
      NextResponse.redirect(
        `${
          process.env.NEXT_PUBLIC_FRONT_END_URL
        }/auth/integration?message=${encodeURIComponent(error.message)}`
      );
    }

    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_FRONT_END_URL}/auth/integration?message=success`
    );
  }

  const { error } = await supabaseBypass.from("integration_notion").insert({
    workspace_id: data.workspace_id,
    access_token: data.access_token,
    user_id: session.user.id,
    workspace_name: data.workspace_name,
    workspace_icon: data.workspace_icon,
  });

  if (error) {
    console.log(error,165);
    return NextResponse.json({
      message: "error",
      error: error,
    });
  }

  return NextResponse.redirect(
    `${process.env.NEXT_PUBLIC_FRONT_END_URL}/auth/integration?message=success&token=` +
      data.access_token
  );
};
