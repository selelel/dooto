import { GetCookie } from "@/lib/header";
import { logger } from "@/lib/logger";
import { ServerApiClient } from "@/lib/serverApiClient";
import { POSTRegisterResponseT } from "@/modules/user/types";
import { AxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";

const endpoint = "/users/me";
export async function GET(req: NextRequest) {
  const cookie = GetCookie(req.headers);
  const headers = { cookie }

  try {
    const response = await ServerApiClient.get<POSTRegisterResponseT>(endpoint, {headers});
    return NextResponse.json(response.data, { status: 200 });
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