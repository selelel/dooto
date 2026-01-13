import { GetCookie, ParseHeader } from "@/lib/header";
import { logger } from "@/lib/logger";
import { ServerApiClient } from "@/lib/serverApiClient";
import { POSTHabitRequest, POSTHabitResponse } from "@/modules/habit/types";
import { Task, POSTTaskRequest } from "@/modules/tasks/types";
import { AxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";

const endpoint = "/habit";

export async function POST(req: NextRequest) {
  const cookie = GetCookie(req.headers);
  const headers = { cookie }
  const body = await req.json();
  
  try {
    
    const response = await ServerApiClient.post<POSTHabitResponse, POSTHabitRequest>(endpoint, body, {headers});
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

// GET all user habits
export async function GET(req: NextRequest) {
  const cookie = GetCookie(req.headers);
  const headers = { cookie }
  const { searchParams } = new URL(req.url)
  const categoryId = searchParams.get('categoryId')

  const params = categoryId ? {categoryId} : {}

  try {
    
    const response = await ServerApiClient.get<POSTHabitResponse[] | POSTHabitResponse>(endpoint, { headers, params });
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
  const { searchParams } = new URL(req.url)
  const id = searchParams.get('id')

  const params = id ? {id} : {}

  logger.trace(id)

  try {
    
    const response = await ServerApiClient.delete<POSTHabitResponse>(endpoint, undefined, { headers, params });
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

export async function PATCH(req: NextRequest) {
  const cookie = GetCookie(req.headers);
  const headers = { cookie }
  const body = await req.json();
  logger.trace("Patch Body: ", req.body)

  try {
    const response = await ServerApiClient.patch<POSTHabitResponse>(endpoint, body, {headers});
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