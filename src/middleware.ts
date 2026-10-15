import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const SESSION_COOKIE_NAME = "malabar_care_session";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only apply checks on /admin routes
  if (pathname.startsWith("/admin")) {
    const isLoginPage = pathname === "/admin/login";
    const token = request.cookies.get(SESSION_COOKIE_NAME)?.value;

    let isAuthenticated = false;
    if (token) {
      try {
        const secret = process.env.SESSION_SECRET || "fallback_malabar_secret_min_32_characters_key_2026";
        const secretKey = new TextEncoder().encode(secret);
        await jwtVerify(token, secretKey);
        isAuthenticated = true;
      } catch {
        isAuthenticated = false;
      }
    }

    // Unauthenticated user trying to access protected admin page
    if (!isAuthenticated && !isLoginPage) {
      const loginUrl = new URL("/admin/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }

    // Authenticated user trying to access /admin/login
    if (isAuthenticated && isLoginPage) {
      return NextResponse.redirect(new URL("/admin/dashboard", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
