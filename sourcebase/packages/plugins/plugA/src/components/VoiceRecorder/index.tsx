import { AudioOutlined, ReloadOutlined } from "@ant-design/icons"
import { useVoice } from "../../providers/VoiceProvider"
import React from "react"

const VoiceRecorder = () => {
  const { startRecording, stopRecording, isRecording, setIsRecording, reset } =
    useVoice()
  const toggleRecordingState = () => {
    if (isRecording) {
      stopRecording()
    } else {
      startRecording()
    }
    setIsRecording(!isRecording)
  }
  return (
    <div className="flex gap-3 my-2">
      <div
        onClick={toggleRecordingState}
        className="flex size-16 shadow-md mt-auto items-center justify-center cursor-pointer rounded-xl bg-purple-100"
      >
        {isRecording ? (
          <img src={"/audio.svg"} className="size-10 animate-pulse" />
        ) : (
          <AudioOutlined className="text-4xl" />
        )}
      </div>
      <div
        onClick={reset}
        className="flex size-16 shadow-md mt-auto items-center justify-center cursor-pointer rounded-xl bg-purple-100"
      >
        <ReloadOutlined className="text-4xl" />
      </div>
    </div>
  )
}

export default VoiceRecorder
