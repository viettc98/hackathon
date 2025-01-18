import { AudioOutlined } from "@ant-design/icons";
import { useVoiceContext } from "../../hooks/useVoiceContext";

const VoiceRecorder = () => {
  const { isRecording, setIsRecording } = useVoiceContext();
  const toggleRecordingState = () => {
    setIsRecording(!isRecording);
  };
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
  );
};

export default VoiceRecorder;
