import { AudioOutlined } from "@ant-design/icons"
import { useVoice } from "../../providers/VoiceProvider"

const VoiceRecorder = () => {
  const { startRecording, stopRecording, isRecording, setIsRecording } = useVoice()
  const toggleRecordingState = () => {
    if (isRecording) {
      stopRecording()
    } else {
      startRecording()
    }
    setIsRecording(!isRecording)
  }
  return (
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
  )
}

export default VoiceRecorder
