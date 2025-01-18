import React, {
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react"
import { RANDOM_SPEECH } from "../constants"
import { handleGetVoiceData } from "../utils/handleGetVoiceData"

export interface IVoiceProvider {
  inputVoice: string
  setInputVoice: (inputVoice: string) => void
  finalTranscript: string
  setFinalTranscript: (finalTranscript: string) => void
  script: string
  setScript: (script: string) => void
  recognition: SpeechRecognition | null
  setRecognition: (recognition: SpeechRecognition | null) => void
  audioBlob: Blob | null
  setAudioBlob: (audioBlob: Blob | null) => void
  startRecording: () => void
  stopRecording: () => void
  isRecording: boolean
  setIsRecording: (isRecording: boolean) => void
  reset: () => void
}

const VoiceProviderContext = React.createContext({} as IVoiceProvider)

const VoiceProvider = ({ children }: PropsWithChildren) => {
  const [inputVoice, setInputVoice] = useState<string>("")
  const [finalTranscript, setFinalTranscript] = useState<string>("")
  const [script, setScript] = useState<string>("")
  const [isRecording, setIsRecording] = useState<boolean>(false)
  

  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null)
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null)

  const stopRecording = () => {
    if (!recognition) return
    recognition.stop()
  }

  const startRecording = async () => {
    if (!recognition) return

    const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
    const mediaRecorder = new MediaRecorder(stream)
    const audioChunks: BlobPart[] = []

    mediaRecorder.ondataavailable = (event) => {
      audioChunks.push(event.data)
    }

    mediaRecorder.onstop = async () => {
      const audioBlob = new Blob(audioChunks, { type: "audio/wav" })
      console.log("🚀 ~ mediaRecorder.onstop= ~ audioBlob:", audioBlob)
      const transcript = await handleGetVoiceData(audioBlob)
      if (!transcript) return
      setAudioBlob(audioBlob)
      setFinalTranscript(transcript)
    }

    mediaRecorder.start()
    recognition.start()

    recognition.onend = () => {
      mediaRecorder.stop()
    }
  }

  const reset = () => {
    setFinalTranscript("")
    setScript(RANDOM_SPEECH[Math.floor(Math.random() * RANDOM_SPEECH.length)])
    setAudioBlob(null)
    setIsRecording(false)
  }

  useEffect(() => {
    // Init app state
    if (!("webkitSpeechRecognition" in window)) {
      alert("Web Speech API is not supported in this browser.")
      return
    }

    const recognitionInstance = new (window as any).webkitSpeechRecognition()
    recognitionInstance.continuous = true
    recognitionInstance.interimResults = true
    setRecognition(recognitionInstance)
    setScript(RANDOM_SPEECH[Math.floor(Math.random() * RANDOM_SPEECH.length)])
  }, [])
  return (
    <VoiceProviderContext.Provider
      value={{
        reset,
        isRecording,
        setIsRecording,
        stopRecording,
        startRecording,
        inputVoice,
        setInputVoice,
        finalTranscript,
        setFinalTranscript,
        script,
        setScript,
        recognition,
        setRecognition,
        audioBlob,
        setAudioBlob,
      }}
    >
      {children}
    </VoiceProviderContext.Provider>
  )
}

export const useVoice = () => {
  const context = useContext(VoiceProviderContext)
  if (!context) {
    throw new Error("useVoice must be used within a VoiceProvider")
  }
  return context
}

export default VoiceProvider
