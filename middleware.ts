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
    "/form/detail",
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

  if (
    req.nextUrl.pathname !== "/" &&
    list.some((path) => req.nextUrl.pathname.startsWith(path))
  ) {
    const supabase = createMiddlewareClient({ req, res });

    const {
      data: { user },
    } = await supabase.auth.getUser();

    const redirectToCreateForm = () => {
      if (
        req.nextUrl.pathname == "/form/create" ||
        req.nextUrl.pathname == "/custom/form"
      ) {
        return "?redirect=/custom/form";
      }
      return "";
    };

    if (!user) {
      return NextResponse.redirect(
        new URL(`/login${redirectToCreateForm()}`, req.url)
      );
    }
  }

  return res;
}
