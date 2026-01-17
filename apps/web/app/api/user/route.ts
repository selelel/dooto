import { GetCookie, ParseHeader } from "@/lib/header";
import { logger } from "@/lib/logger";
import { ServerApiClient } from "@/lib/serverApiClient";
import { POSTTimerRequest, POSTTimerResponse } from "@/modules/timer/types";
import { POSTRegisterRequestT, POSTRegisterResponseT } from "@/modules/user/types";
import { AxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";

const endpoint = "/users";

export async function PATCH(req: NextRequest) {
  const cookie = GetCookie(req.headers);
    const headers = { cookie }
  const body = await req.json();
  
  try {
    const response = await ServerApiClient.patch<POSTRegisterResponseT, Partial<POSTRegisterRequestT>>(endpoint, body, {headers});
    return NextResponse.json(response.data, { status: 200 });
  } catch (error) {
    logger.trace(error)
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

export async function DELETE(req: NextRequest) {
  const cookie = GetCookie(req.headers);
  const headers = { cookie }
  
  try {
    logger.trace("Invoked")
    const response = await ServerApiClient.delete<POSTRegisterResponseT>(endpoint, {headers});
    logger.trace(response)
    return NextResponse.json(response.data, { status: 200 });
  } catch (error) {
    logger.trace(error)
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