// middleware.ts  (Next 13+ / App Router)
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/* ───────── 1. Public paths ───────── */
const PUBLIC_PATHS = ["/login", "/register","/Onbording","/api/upload"];

function isPublicPath(pathname: string) {
  return (
    PUBLIC_PATHS.some(
      (p) => pathname === p || pathname.startsWith(`${p}/`)
    ) ||
    /^\/_next\//.test(pathname) ||
    pathname === "/favicon.ico" ||
    /\.(?:png|jpg|jpeg|svg|css|js|woff2?|ttf)$/.test(pathname)
  );
}

/* ───────── 2. Tiny JWT decoder (edge-safe) ───────── */
function parseJwt(token?: string) {
  if (!token) return null;
  try {
    const base64 = token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/");
    return JSON.parse(atob(base64));
  } catch {
    return null;
  }
}

/* ───────── 3. Main middleware ───────── */
export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  /* Public routes always allowed */
  

  const token = req.cookies.get("auth_token")?.value;
  const payload = parseJwt(token);
  
  
  if (isPublicPath(pathname)&&!payload){
     return NextResponse.next();
  }

  if (isPublicPath(pathname)&&payload){
    const url = req.nextUrl.clone();
    url.pathname = "/";
     return NextResponse.redirect(url);
    }
  
  if (!payload) {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  if (pathname.startsWith("/dashboard") && payload.role !== "ADMIN") {
    const url = req.nextUrl.clone();
    url.pathname = "/forbidden";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next|favicon.ico|.*\\.(?:png|jpg|jpeg|svg|css|js|woff2?|ttf)).*)",
  ],
};
