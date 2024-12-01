import { NextResponse } from "next/server";
import { auth as middleware } from "@/auth";

import { PUBLIC_ROUTES, Routes } from "@/routes";

export default middleware((req) => {
  const { nextUrl } = req;
  const isAuthenticated = !!req.auth;
  const isPublicRoute = PUBLIC_ROUTES.includes(nextUrl.pathname);

  if (!isAuthenticated && !isPublicRoute) {
    return Response.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}${Routes.ROOT}`);
  }
  return NextResponse.next();
});


export const config = {
  matcher: ["/((?!api/auth|_next/static|_next/image|favicon.ico).*)"],
};
