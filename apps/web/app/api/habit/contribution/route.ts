import { ParseHeader } from "@/lib/header";
import { logger } from "@/lib/logger";
import { ServerApiClient } from "@/lib/serverApiClient";
import { requireId } from "@/lib/utils";
import { POSTHabitResponse } from "@/modules/habit/types";
import { AxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";

const endpoint = "/habit";

const buildParams = (to?: string | null, from?: string | null) => {
  const params: Record<string, string> = {};
  if (to) params.to = to;
  if (from) params.from = from;
  return params;
};


export async function POST(req: NextRequest) {
  const headers = ParseHeader(req.headers);
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("habitId");

  requireId(id)

  try {
    const response = await ServerApiClient.post(
      `${endpoint}/toggle/${id}`,
      undefined,
      { headers }
    );

    // Toggle action → 200 OK
    return NextResponse.json(response.data, { status: 200 });
  } catch (error) {
    logger.trace(error);

    if (error instanceof AxiosError) {
      return NextResponse.json(
        { message: error.response?.data?.message ?? error.message },
        { status: error.response?.status ?? 500 }
      );
    }

    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  const headers = ParseHeader(req.headers);
  const { searchParams } = new URL(req.url);

  const id = searchParams.get("habitId");
  const to = searchParams.get("to");
  const from = searchParams.get("from");

  requireId(id)

  const params = buildParams(to, from);

  try {
    const response = await ServerApiClient.get(`${endpoint}/contribution/${id}`, {
      headers,
      params,
    });

    return NextResponse.json(response.data, { status: 200 });
  } catch (error) {
    logger.trace(error);

    if (error instanceof AxiosError) {
      return NextResponse.json(
        { message: error.response?.data?.message ?? error.message },
        { status: error.response?.status ?? 500 }
      );
    }

    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}