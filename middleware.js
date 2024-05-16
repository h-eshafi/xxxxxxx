// export { default } from "next-auth/middleware";

// export const config = { matcher: ["/", "/members/:path*", "/profile/:path*", "/api/:path*"] };
import { NextResponse } from "next/server";
import { withAuth } from "next-auth/middleware";

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  async function middleware(request) {
    console.log(request.nextUrl.pathname)
    console.log(request.nextUrl.token?.role)

    // Admin Page Protect
    if (
      request.nextUrl.pathname.startsWith("/dashboard/admin") &&
      request.nextauth.token?.role !== "admin"
    ) {
      return NextResponse.rewrite(new URL("/notFound", request.url));
    }

    // member Page Protect
    if (
      request.nextUrl.pathname.startsWith("/dashboard/member") &&
      request.nextauth.token?.role !== "Member"
    ) {
      return NextResponse.rewrite(new URL("/notFound", request.url));
    }

    // if (
    //   request.nextUrl.pathname.startsWith("/api") &&
    //   request.nextauth.token?.role !== "Admin"
    // ) {
    //   return NextResponse.rewrite(new URL("/notFound", request.url));
    // }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);


// Ref: https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
export const config = {
  matcher: ["/", "/dashboard/:path*"],
};