import { ServerApiClient } from "@/lib/serverApiClient";
import { AxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST() {
  const endpoint = "/users/logout";

  try {
    await ServerApiClient.post<null, null>(endpoint, null);

    return NextResponse.redirect('/')
  } catch (error) {
    if (error instanceof AxiosError) {
      return NextResponse.json(
        {
          message: error.response?.data?.message || error.message || "Request failed",
        },
        {
          status: error.response?.status || 500,
        }
      );
    }

    return NextResponse.json(
      {
        message: "Internal Server Error",
      },
      {
        status: 500,
      }
    );
  }
}
