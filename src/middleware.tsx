import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const publicPaths = ["/login", "/signup", "/"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isAuthenticated = request.cookies.has("userAccessToken");

  if (publicPaths.includes(pathname)) {
    if (isAuthenticated && (pathname === "/login" || pathname === "/")) {
      return NextResponse.redirect(new URL("/workspaces", request.url));
    }
    return NextResponse.next();
  }

  if (!isAuthenticated) {
    const url = new URL("/login", request.url);
    url.searchParams.set("redirect", pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$).*)"],
};
