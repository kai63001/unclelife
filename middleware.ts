import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  //   // if user is signed in and the current path is / redirect the user to /account
  //   if (user && req.nextUrl.pathname === "/") {
  //     return NextResponse.redirect(new URL("/home", req.url));
  //   }

  if (!user && req.nextUrl.pathname !== "/") {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return res;
}

export const config = {
  matcher: ["/home","/form/create","/form/my", '/setting'],
};

export const dynamic = 'force-dynamic';
