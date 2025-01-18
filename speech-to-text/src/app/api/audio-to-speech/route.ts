/* eslint-disable */
import { TranscriptionResponse } from "@/types/TranscriptionResponse"
import axios from "axios"
import { NextApiRequest, NextApiResponse } from "next"
import { NextRequest, NextResponse } from "next/server"

// Endpoints
// ========================================================
/**
 * Basic OPTIONS Request to simuluate OPTIONS preflight request for mutative requests
 */
export const OPTIONS = async (request: NextRequest) => {
  return new NextResponse("", {
    status: 200,
  })
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData()
    const { data } = await axios.post<TranscriptionResponse>(
      `https://api.lemonfox.ai/v1/audio/transcriptions`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${process.env.LEMONFOX_API_KEY}`,
        },
      }
    )
    console.log("🚀 ~ POST ~ data:", data)
    return NextResponse.json(
      { success: true, data: data.text },
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
        },
      }
    )
  } catch (error) {
    console.log("🚀 ~ downloadAudio ~ error:", error)
    return NextResponse.json({ success: false, error: "there was an error" })
  }
}
