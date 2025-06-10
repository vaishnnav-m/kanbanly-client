import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PUBLIC_ROUTES = ["/login", "/signup", "/signup-success"];
const ALWAYS_PUBLIC_ROUTES = ["/", "/verify-email"];
const PROTECTED_ROUTES = ["/workspaces"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isAuthenticated = request.cookies.has("userAccessToken");

  if (isAuthenticated) {
    if (PUBLIC_ROUTES.includes(pathname)) {
      return NextResponse.redirect(new URL("/workspaces", request.url));
    }

    if (pathname === "/") {
      return NextResponse.redirect(new URL("/workspaces", request.url));
    }

    return NextResponse.next();
  }

  if (!isAuthenticated) {
    if (PROTECTED_ROUTES.some((route) => pathname.startsWith(route))) {
      const url = new URL("/login", request.url);
      url.searchParams.set("redirect", pathname);
      return NextResponse.redirect(url);
    }

    if (
      ALWAYS_PUBLIC_ROUTES.includes(pathname) ||
      PUBLIC_ROUTES.includes(pathname)
    ) {
      return NextResponse.next();
    }

    const url = new URL("/login", request.url);
    url.searchParams.set("redirect", pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$).*)"],
};
