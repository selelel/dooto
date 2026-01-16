import { GetCookie } from "@/lib/header";
import { logger } from "@/lib/logger";
import { ServerApiClient } from "@/lib/serverApiClient";
import { POSTMoodJournalRequest, POSTMoodJournalResponse } from "@/modules/mood-journal/types";
import { AxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";

const endpoint = "/mood-journal";

export async function POST(req: NextRequest) {
  const cookie = GetCookie(req.headers);
  const headers = { cookie }
  const body = await req.json();
  
  try {
    const response = await ServerApiClient.post<POSTMoodJournalResponse, POSTMoodJournalRequest>(endpoint, body, {headers});
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
  const { searchParams } = new URL(req.url);
  const to = searchParams.get('to');
  const from = searchParams.get('from');
  const params = to && from ? { to, from } : {};
  
  try {
    const response = await ServerApiClient.get<POSTMoodJournalResponse[]>(endpoint, {headers, params});
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