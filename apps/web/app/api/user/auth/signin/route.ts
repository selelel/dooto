import { logger } from "@/lib/logger";
import { ServerApiClient } from "@/lib/serverApiClient";
import { POSTSigninRequestT } from "@/modules/user/types";
import { AxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const endpoint = "/users/signin/password";

  try {
    const body = (await req.json()).body;

    const response = await ServerApiClient.post<undefined, POSTSigninRequestT>(
      endpoint,
      body
    );

    return NextResponse.redirect('/home')
  } catch (error) {
    if (error instanceof AxiosError) {
        logger.info('Error: ', error)
      return NextResponse.json(
        {
          message: error.response?.data?.message || error.message || "Request failed",
        },
        {
          status: error.response?.status || 500,
        }
      );
    }

    return NextResponse.json(
      {
        message: "Internal Server Error",
      },
      {
        status: 500,
      }
    );
  }
}