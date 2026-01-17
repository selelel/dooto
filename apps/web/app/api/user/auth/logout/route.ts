import { GetCookie } from "@/lib/header";
import { logger } from "@/lib/logger";
import { ServerApiClient } from "@/lib/serverApiClient";
import { AxiosError } from "axios";
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const endpoint = "/users/logout";

  try {
    const cookie = GetCookie(req.headers);
    const headers = { cookie };

    await ServerApiClient.post(endpoint, null, { headers });

    const res = NextResponse.json({ success: true });

    res.cookies.set("connect.sid", "", {
      path: "/",
      maxAge: 0,
      httpOnly: true,
      sameSite: "lax",
      //! Not sure here.
      secure: true
    });

    return res;
  } catch (error) {
    logger.trace(error);

    if (error instanceof AxiosError) {
      return NextResponse.json(
        {
          message:
            error.response?.data?.message ||
            error.message ||
            "Request failed",
        },
        { status: error.response?.status || 500 }
      );
    }

    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
