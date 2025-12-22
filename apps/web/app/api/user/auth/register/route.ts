import { ServerApiClient } from "@/lib/serverApiClient";
import { AxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";

type POSTRegisterRequestT = {
  user: {
    id: string;
    name: string;
    username: string;
    email: string;
    provider: string;
    createdAt: string;
  };
};

type POSTRegisterResponseT = {
  name: string;
  username: string;
  email: string;
  password: string;
};

export async function POST(req: NextRequest) {
  const endpoint = "/users/register";

  try {
    const body = (await req.json()).body; // or just await req.json() depending on your request shape

    const response = await ServerApiClient.post<POSTRegisterResponseT, POSTRegisterRequestT>(
      endpoint,
      body
    );

    return NextResponse.json(
      {
        message: response.data,
      },
      {
        status: response.status,
      }
    );
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
