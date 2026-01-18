import axios, { AxiosError } from "axios"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
  const endpoint = "https://api.api-ninjas.com/v2/quotes"
  const { searchParams } = new URL(req.url)

  const categories = searchParams.get("categories")
  const exclude_categories = searchParams.get("exclude_categories")
  const author = searchParams.get("author")
  const work = searchParams.get("work")
  const limit = searchParams.get("limit")
  const offset = searchParams.get("offset")

  try {
    const response = await axios.get(endpoint, {
      headers: {
        "X-Api-Key": process.env.API_NINJAS_KEY!,
      },
      params: {
        categories,
        exclude_categories,
        author,
        work,
        limit,
        offset,
      },
    })

    return NextResponse.json(
      {
        data: response.data,
      },
      { status: 200 }
    )
  } catch (error) {
    if (error instanceof AxiosError) {
      return NextResponse.json(
        {
          message: error.response?.data || error.message,
        },
        {
          status: error.response?.status || 500,
        }
      )
    }

    return NextResponse.json(
      { message: "Unknown server error" },
      { status: 500 }
    )
  }
}
