import { ParseHeader } from "@/lib/header";
import { logger } from "@/lib/logger";
import { ServerApiClient } from "@/lib/serverApiClient";
import { POSTHabitRequest, POSTHabitResponse } from "@/modules/habit/types";
import { POSTMoodJournalResponse } from "@/modules/mood-journal/types";
import { AxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";

const endpoint = "/mood-journal";
const endpointAddedId = (id:string) => `${endpoint}/${id}`

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const headers = ParseHeader(req.headers);
  const { id } = await params
  try {
    
    const response = await ServerApiClient.get<POSTMoodJournalResponse>(endpointAddedId(id), { headers });
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

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const headers = ParseHeader(req.headers);
  const {id} = await params

  try {
    const response = await ServerApiClient.delete<POSTHabitResponse>(endpointAddedId(id), undefined, { headers, params });
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

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const headers = ParseHeader(req.headers);
  const body = await req.json();
  const { id } = await params 

  try {
    const response = await ServerApiClient.patch<POSTHabitResponse, Partial<POSTHabitRequest>>(endpointAddedId(id), body, {headers});
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