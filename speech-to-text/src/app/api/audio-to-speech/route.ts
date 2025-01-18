import { TranscriptionResponse } from "@/types/TranscriptionResponse"
import axios from "axios"
import { NextResponse } from "next/server"


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
    return NextResponse.json({ success: true, data: data.text })
  } catch (error) {
    console.log("🚀 ~ downloadAudio ~ error:", error)
    return NextResponse.json({ success: false, error: 'there was an error' })
  }
}
