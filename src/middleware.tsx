import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// function to decode jwt
function decodeJwt(token: string) {
  const base64Payload = token.split(".")[1];
  const payload = Buffer.from(base64Payload, "base64").toString("utf-8");
  return JSON.parse(payload);
}

export function middleware(request: NextRequest) {
  // routes
  const USER_PUBLIC_ROUTES = [
    "/login",
    "/signup",
    "/signup-success",
    "/forgot-password",
    "/reset-password",
  ];
  const ADMIN_PUBLIC_ROUTES = ["/admin/login"];
  const ALWAYS_PUBLIC_ROUTES = ["/", "/verify-email"];
  const USER_PROTECTED_ROUTES = [
    "/user",
    "/workspaces",
    "/workspaces/create",
    "/join-workspace",
  ];
  const ADMIN_PROTECTED_ROUTES = ["/admin/dashboard", "/admin/users"];

  const { pathname } = request.nextUrl;

  const token = request.cookies.get("refreshToken")?.value;
  const decodedToken = token ? decodeJwt(token) : null;
  const userRole = decodedToken?.role as "admin" | "user" | undefined;

  const isAdminPath = pathname.startsWith("/admin");
  const isUserPath = !isAdminPath;

  // Admin logic
  if (isAdminPath) {
    if (userRole === "admin") {
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
    if (userRole === "user") {
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
