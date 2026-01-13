import { GetCookie, ParseHeader } from "@/lib/header";
import { logger } from "@/lib/logger";
import { ServerApiClient } from "@/lib/serverApiClient";
import { POSTHabitRequest, POSTHabitResponse } from "@/modules/habit/types";
import { Task, POSTTaskRequest } from "@/modules/tasks/types";
import { POSTTimerRequest, POSTTimerResponse } from "@/modules/timer/types";
import { AxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";

const endpoint = "/badhabit-timer";

export async function POST(req: NextRequest) {
  const cookie = GetCookie(req.headers);
const headers = { cookie }
  const body = await req.json();
  
  try {
    
    const response = await ServerApiClient.post<POSTTimerResponse, POSTTimerRequest>(endpoint, body, {headers});
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

export async function GET(req: NextRequest) {
  const cookie = GetCookie(req.headers);
  const headers = { cookie }
  
  try {
    const response = await ServerApiClient.get<POSTTimerResponse[]>(endpoint, {headers});
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