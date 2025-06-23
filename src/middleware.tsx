import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const USER_PUBLIC_ROUTES = ["/login", "/signup", "/signup-success"];
const ADMIN_PUBLIC_ROUTES = ["/admin/login"];
const ALWAYS_PUBLIC_ROUTES = ["/", "/verify-email"];
const USER_PROTECTED_ROUTES = ["/workspaces"];
const ADMIN_PROTECTED_ROUTES = ["/admin/dashboard", "/admin/users"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isUserAuthenticated = request.cookies.has("userRefreshToken");
  const isAdminAuthenticated = request.cookies.has("adminRefreshToken");

  const isAdminPath = pathname.startsWith("/admin");
  const isUserPath = !isAdminPath;

  // Admin logic
  if (isAdminPath) {
    if (isAdminAuthenticated) {
      if (ADMIN_PUBLIC_ROUTES.includes(pathname)) {
        return NextResponse.redirect(new URL("/admin/dashboard", request.url));
      }
      return NextResponse.next();
    } else {
      if (ADMIN_PROTECTED_ROUTES.some((route) => pathname.startsWith(route))) {
        const url = new URL("/admin/login", request.url);
        url.searchParams.set("redirect", pathname);
        return NextResponse.redirect(url);
      }

      if (ADMIN_PUBLIC_ROUTES.includes(pathname)) {
        return NextResponse.next();
      }

      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  // User logic
  if (isUserPath) {
    if (isUserAuthenticated) {
      if (USER_PUBLIC_ROUTES.includes(pathname) || pathname === "/") {
        return NextResponse.redirect(new URL("/workspaces", request.url));
      }

      return NextResponse.next();
    }

    if (USER_PROTECTED_ROUTES.some((route) => pathname.startsWith(route))) {
      const url = new URL("/login", request.url);
      url.searchParams.set("redirect", pathname);
      return NextResponse.redirect(url);
    }

    if (
      ALWAYS_PUBLIC_ROUTES.includes(pathname) ||
      USER_PUBLIC_ROUTES.includes(pathname)
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
