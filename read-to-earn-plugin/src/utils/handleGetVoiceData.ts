import axios from "axios"
import { APITranscriptionResponse } from "../types/TranscriptionResponse"
import { API_ROUTES } from "../constants"

const API_ENDPOINT = "http://localhost:3000/"
export const handleGetVoiceData = async (audioBlob: Blob) => {
  try {
    const formData = new FormData()
    formData.append("file", audioBlob)
    formData.append("language", "english")
    formData.append("response_format", "json")

    const { data } = await axios.post<APITranscriptionResponse>(
      `${API_ENDPOINT}${API_ROUTES.TRANSCRIPTION}`,
      formData
    )
    console.log("🚀 ~ downloadAudio ~ data:", data)

    return data.data
  } catch (error) {
    console.log("🚀 ~ downloadAudio ~ error:", error)
  }
}
