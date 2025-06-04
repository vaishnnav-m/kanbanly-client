// middleware.tsx
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PUBLIC_AUTH_ROUTES = ["/login", "/signup"];
const PUBLIC_LANDING_ROUTES = ["/"];
const PROTECTED_ROUTES = ["/workspaces"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isAuthenticated = request.cookies.has("userAccessToken");

  if (!isAuthenticated) {
    if (PROTECTED_ROUTES.some((route) => pathname.startsWith(route))) {
      const url = new URL("/login", request.url);
      url.searchParams.set("redirect", pathname);
      return NextResponse.redirect(url);
    }

    if (
      PUBLIC_AUTH_ROUTES.includes(pathname) ||
      PUBLIC_LANDING_ROUTES.includes(pathname)
    ) {
      return NextResponse.next();
    }

    const url = new URL("/login", request.url);
    url.searchParams.set("redirect", pathname);
    return NextResponse.redirect(url);
  }

  if (isAuthenticated) {
    if (PUBLIC_AUTH_ROUTES.includes(pathname)) {
      return NextResponse.redirect(new URL("/workspaces", request.url));
    }

    if (pathname === "/") {
      return NextResponse.redirect(new URL("/workspaces", request.url));
    }

    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$).*)"],
};
