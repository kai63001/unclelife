import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";
import {
  checkIsEnterprise,
  validateDomain,
} from "./lib/customDomainController";

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

  if (
    host &&
    host != "localhost:3000" &&
    !host?.includes("supabase.io") &&
    host != "unclelife.co" &&
    host != "www.unclelife.co"
  ) {
    const redirect = await validateDomain(host, url.pathname);
    if (redirect) {
      const is_enterprise = await checkIsEnterprise(redirect);
      if (!is_enterprise) {
        return NextResponse.rewrite(new URL("/404", req.url));
      }
      url.pathname = `/public/form/${redirect}`;
      return NextResponse.rewrite(url);
    }

    return NextResponse.rewrite(new URL("/404", req.url));
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