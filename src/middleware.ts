
/*
<ai_context>
File ensures that in development mode, a user is always logged in by automatically calling signIn if no session.
</ai_context>
*/

import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  if (process.env.NODE_ENV !== "development") {
    return NextResponse.next();
  }

  // If user is not signed in, redirect to credentials sign-in
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET || "dev-secret" });
  if (!token) {
    const signInUrl = new URL("/api/auth/signin?callbackUrl=/", req.url);
    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
}

// Match all routes except for the NextAuth endpoints, public, etc.
export const config = {
  matcher: [
    /*
      We skip next-auth routes and public files.
      Adjust to your project's needs. 
    */
    "/((?!api/auth|_next/static|_next/image|favicon.ico|public).*)"
  ],
};
