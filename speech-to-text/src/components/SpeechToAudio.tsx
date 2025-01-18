// components/SpeechToAudio.tsx
import { API_ROUTES, RANDOM_SPEECH } from "@/app/constants"
import {
  APITranscriptionResponse
} from "@/types/TranscriptionResponse"
import { compareParagraphs } from "@/utils/matchedFunc"
import { removePunctuationAndQuotation } from "@/utils/stringToParagraph"
import axios from "axios"
import React, { useEffect, useMemo, useState } from "react"

const SpeechToAudio: React.FC = () => {
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null)
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null)
  const [finalTranscript, setFinalTranscript] = useState("Walking in the park is refreshing the trees of the rice and the flowers are in full but it's a great place to clear your mind and enjoy nature.")

  const [randomSpeechNumber, setRandomSpeechNumber] = useState(0)

  useEffect(() => {
    setRandomSpeechNumber(Math.floor(Math.random() * RANDOM_SPEECH.length))
  }, [])

  useEffect(() => {
    if (!("webkitSpeechRecognition" in window)) {
      alert("Web Speech API is not supported in this browser.")
      return
    }

    const recognitionInstance = new (window as any).webkitSpeechRecognition()
    recognitionInstance.continuous = true
    recognitionInstance.interimResults = true
    setRecognition(recognitionInstance)
  }, [])

  const startRecording = async () => {
    if (!recognition) return

    const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
    const mediaRecorder = new MediaRecorder(stream)
    const audioChunks: BlobPart[] = []

    mediaRecorder.ondataavailable = (event) => {
      audioChunks.push(event.data)
    }

    mediaRecorder.onstop = () => {
      const audioBlob = new Blob(audioChunks, { type: "audio/wav" })
      setAudioBlob(audioBlob)
    }

    mediaRecorder.start()
    recognition.start()

    recognition.onend = () => {
      mediaRecorder.stop()
    }
  }

  const downloadAudio = async () => {
    if (!audioBlob) return

    try {
      const formData = new FormData()
      formData.append("file", audioBlob)
      formData.append("language", "english")
      formData.append("response_format", "json")

      const { data } = await axios.post<APITranscriptionResponse>(
        API_ROUTES.TRANSCRIPTION,
        formData
      )
      console.log("🚀 ~ downloadAudio ~ data:", data)

      setFinalTranscript(data.data)
    } catch (error) {
      console.log("🚀 ~ downloadAudio ~ error:", error)
    }
  }

  const stopRecording = () => {
    if (!recognition) return
    recognition.stop()
  }

  const speechToText = useMemo(() => {
    return RANDOM_SPEECH[randomSpeechNumber]
  }, [randomSpeechNumber])

  const highlightMatchedWords = (text: string, wordsToHighlight: string[]) => {
    const regex = new RegExp(`\\b(${wordsToHighlight.join("|")})\\b`, "gi")
    const parts = text.split(regex)

    return (
      <>
        {parts.map((part, index) =>
          wordsToHighlight.includes(part.toLowerCase()) ? (
            <span key={index} className="highlight text-blue">
              {part}
            </span>
          ) : (
            <span key={index} className="text-red">{part}</span>
          )
        )}
      </>
    )
  }

  return (
    <div className="flex flex-col gap-2">
      <div>
        <h3 className="text-xl font-bold">Reading this paragraph out loud</h3>
        <p>{speechToText}</p>
      </div>
      <button onClick={startRecording}>Start Recording</button>
      <button onClick={stopRecording}>Stop Recording</button>
      {audioBlob && <button onClick={downloadAudio}>Get Matched Result</button>}

      {finalTranscript && (
        <>
          <p>Result: {compareParagraphs(speechToText, finalTranscript)}%</p>
          <p>
            Matched words:
            {highlightMatchedWords(
              finalTranscript,
              removePunctuationAndQuotation(speechToText.toLowerCase()).split(
                " "
              )
            )}
          </p>
        </>
      )}
    </div>
  )
}

export default SpeechToAudio
