import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";
import { validateDomain } from "./lib/customDomainController";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const list = [
    "/home",
    "/form/create",
    "/form/my",
    "/setting",
    "/widget/pomodoro",
    "/custom/form",
  ];
  const PUBLIC_FILE = /\.(.*)$/; // Files

  const url = req.nextUrl.clone();
  if (PUBLIC_FILE.test(url.pathname) || url.pathname.includes("_next")) return;
  const host = req.headers.get("host");

  // console.log("url", url);
  // console.log("host", host);

  if (
    host &&
    host != "localhost:3000" &&
    !host?.includes("supabase.io") &&
    host != "unclelife.co" &&
    host != "www.unclelife.co"
  ) {
    const redirect = await validateDomain(host, url.pathname);

    url.pathname = `/public/form/${redirect}`;
    if (redirect) return NextResponse.rewrite(url);
  }

  const supabase = createMiddlewareClient({ req, res });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (
    !user &&
    req.nextUrl.pathname !== "/" &&
    list.includes(req.nextUrl.pathname)
  ) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return res;
}

// export const config = {
//   matcher: ["/home","/form/create","/form/my", '/setting', "/widget/pomodoro", "/custom/form"],
// };
