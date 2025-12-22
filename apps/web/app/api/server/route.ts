import { ServerApiClient } from "@/lib/serverApiClient"
import { AxiosError } from "axios"
import { NextResponse } from "next/server"

type GETOnlineT = {
    message: string
}
 
export async function GET() {
  const endpoint = '/online'

  try {
    const response = await ServerApiClient.get<GETOnlineT>(endpoint)
 
    return NextResponse.json({
        message: response.data.message
    }, {
        status: 200,
      })
  } catch (error) {
        if (error instanceof AxiosError) {
            return NextResponse.json({
                message: error.message || "offline"
            }, {
                status: 404,
              })
        }
  }
}