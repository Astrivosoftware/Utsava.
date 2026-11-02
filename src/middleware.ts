import { NextResponse, type NextRequest } from "next/server";
import { ADMIN_COOKIE, sign } from "@/lib/auth";

export async function middleware(req: NextRequest) {
  if (req.nextUrl.pathname.startsWith("/admin/login")) return NextResponse.next();
  const cookie = req.cookies.get(ADMIN_COOKIE)?.value;
  if (process.env.ADMIN_SECRET && cookie && cookie === (await sign("admin"))) {
    return NextResponse.next();
  }
  return NextResponse.redirect(new URL("/admin/login", req.url));
}

export const config = { matcher: ["/admin/:path*"] };
