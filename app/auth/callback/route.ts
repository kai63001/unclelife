import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");

  if (code) {
    try {
      const supabase = createRouteHandlerClient({ cookies });
      const coder = await supabase.auth.exchangeCodeForSession(code);

    } catch (e) {
      console.log(e);
      return NextResponse.redirect(
        new URL("/login", process.env.NEXT_PUBLIC_FRONT_END_URL)
      );
    }
  }
  if (cookies().get("redirect")?.value == "/custom/form") {
    const redirect: any = cookies().get("redirect")?.value;
    // cookies().delete("redirect");
    return NextResponse.redirect(
      new URL(
        decodeURIComponent(redirect || "/home"),
        process.env.NEXT_PUBLIC_FRONT_END_URL
      )
    );
  }

  return NextResponse.redirect(
    new URL("/home", process.env.NEXT_PUBLIC_FRONT_END_URL)
  );
}
