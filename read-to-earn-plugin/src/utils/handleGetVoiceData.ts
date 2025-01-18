import axios from "axios"
import { APITranscriptionResponse } from "../types/TranscriptionResponse"
import { API_ROUTES } from "../constants"

// const API_ENDPOINT = "https://speech-to-text-umber.vercel.app"
const API_ENDPOINT = "https://speech-to-text-umber.vercel.app"
export const handleGetVoiceData = async (audioBlob: Blob) => {
  try {
    const formData = new FormData()
    formData.append("file", audioBlob)
    formData.append("language", "english")
    formData.append("response_format", "json")

    const { data } = await axios.post<APITranscriptionResponse>(
      `${API_ENDPOINT}${API_ROUTES.TRANSCRIPTION}`,
      formData,
      // {
      //   headers: {
      //     "Access-Control-Allow-Origin": "*",
      //   },
      // }
    )
    console.log("🚀 ~ downloadAudio ~ data:", data)

    return data.data
  } catch (error) {
    console.log("🚀 ~ downloadAudio ~ error:", error)
  }
}
