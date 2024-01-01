import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { SessionContainer } from "supertokens-node/recipe/session";
import { withSession } from "./app/utils/sessionUtils";

export async function middleware(
  request: NextRequest & { session?: SessionContainer }
) {
  if (request.headers.has("x-user-id")) {
    console.warn(
      "The FE tried to pass x-user-id, which is only supposed to be a backend internal header. Ignoring."
    );
    request.headers.delete("x-user-id");
  }

  if (request.nextUrl.pathname.startsWith("/api/auth")) {
    /**
     * /api/auth/* endpoints are exposed by the SuperTokens SDK,
     * we do not want to modify the request for these routes
     */
    return NextResponse.next();
  }

  return withSession(
    request,
    async (session) => {
      if (session === undefined) {
        return NextResponse.next();
      }
      return NextResponse.next({
        headers: {
          // You cannot attach the full session object here
          "x-user-id": session.getUserId(),
        },
      });
    }
    //TODO: Add this check for only post request
    //Since post requests are the state changing requests
    // {
    //   checkDatabase: true,
    // }
  );
}

export const config = {
  matcher: "/api/:path*",
};
