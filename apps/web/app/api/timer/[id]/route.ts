import { GetCookie, ParseHeader } from "@/lib/header";
import { logger } from "@/lib/logger";
import { ServerApiClient } from "@/lib/serverApiClient";
import { POSTTimerRequest, POSTTimerResponse } from "@/modules/timer/types";
import { AxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";

const endpoint = "/badhabit-timer";

export async function POST(req: NextRequest, {params}: { params: Promise<{ id: string }> }) {
  const cookie = GetCookie(req.headers);
const headers = { cookie }
  const {id} = (await params);
  
  try {
    const response = await ServerApiClient.post(`${endpoint}/${id}/relapse/toggle`, undefined, {headers});
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


export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const cookie = GetCookie(req.headers);
const headers = { cookie }
    const id = (await params).id
  try {
    const response = await ServerApiClient.get<POSTTimerResponse>(`${endpoint}/${id}`, {headers});
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
    const cookie = GetCookie(req.headers);
const headers = { cookie }
    const { id } = (await params);
    const body = await req.json()

    logger.trace(id)

  try {
    const response = await ServerApiClient.patch<POSTTimerResponse, Partial<POSTTimerRequest>>(`${endpoint}/${id}`, body ,{headers});
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
  const cookie = GetCookie(req.headers);
const headers = { cookie }
  const { id } = (await params);

  try {
    const response = await ServerApiClient.delete<POSTTimerResponse>(`${endpoint}/${id}`, undefined, {headers});
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