import { logger } from "@/lib/logger";
import { ServerApiClient } from "@/lib/serverApiClient";
import { Message, POSTSigninRequestT } from "@/modules/user/types";
import { AxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const endpoint = "/users/signin/password";

  try {
    const body: POSTSigninRequestT = await req.json();

    const response = await ServerApiClient.post<Message>(endpoint, body);

    return NextResponse.json(response.data, { status: 200 }); // OK
  } catch (error) {
    if (error instanceof AxiosError) {
      const status = error.response?.status ?? 500;
      const message =
        error.response?.data?.message ?? error.message ?? "Request failed";

      return NextResponse.json({ message }, { status });
    }

    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}