import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";
export default auth((req) => {
  const { nextUrl, auth: session } = req as any;
  const isLoggedIn = !!session?.user;
  if (nextUrl.pathname.startsWith("/admin")) {
    if (!isLoggedIn) return NextResponse.redirect(new URL("/login", nextUrl));
    if (session?.user?.role !== "ADMIN") return NextResponse.redirect(new URL("/dashboard", nextUrl));
  }
  if (nextUrl.pathname.startsWith("/dashboard") && !isLoggedIn) {
    return NextResponse.redirect(new URL("/login", nextUrl));
  }
});
export const config = { matcher: ["/dashboard/:path*", "/admin/:path*"] };
