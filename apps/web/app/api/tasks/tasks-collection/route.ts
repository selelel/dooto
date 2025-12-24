import { ParseHeader } from "@/lib/header";
import { logger } from "@/lib/logger";
import { ServerApiClient } from "@/lib/serverApiClient";
import { PATCHTasksCollectionRequestT, POSTTasksCollectionRequestT, POSTTasksCollectionResponseT } from "@/modules/tasks/types";
import { AxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const endpoint = "/tasks";
  const headers = ParseHeader(req.headers);

  try {
    const body: POSTTasksCollectionRequestT = await req.json();
    const response = await ServerApiClient.post<Partial<POSTTasksCollectionResponseT>, POSTTasksCollectionRequestT>(endpoint, body, {headers});

    return NextResponse.json(response.data, { status: 201 });
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

export async function GET(req: NextRequest) {
  const endpoint = "/tasks";
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  const headers = ParseHeader(req.headers);
  const params = id ? { id } : {};

  try {
    const response = await ServerApiClient.get<Partial<POSTTasksCollectionResponseT[] | POSTTasksCollectionResponseT>>(endpoint, {headers, params});
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

export async function PATCH(req: NextRequest) {
  const endpoint = "/tasks";
  const headers = ParseHeader(req.headers);
  const body:PATCHTasksCollectionRequestT = await req.json();
  logger.trace(body)
  
  try {
    const response = await ServerApiClient.patch<Partial<POSTTasksCollectionResponseT | Partial<PATCHTasksCollectionRequestT>>>([endpoint, body.tasksId].join('/'), body, {headers});
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
