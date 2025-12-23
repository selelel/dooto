import { ParseHeader } from "@/lib/header";
import { logger } from "@/lib/logger";
import { ServerApiClient } from "@/lib/serverApiClient";
import { Task } from "@/modules/tasks/types";
import { AxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest) {
  const endpoint = "/task";
  const headers = ParseHeader(req.headers);
  const body = await req.json();
  
  try {
    const response = await ServerApiClient.patch<Partial<Task | Partial<Task>>>(endpoint, body, {headers});
    console.trace(response)
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