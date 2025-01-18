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
      className="flex size-24 mt-auto items-center justify-center cursor-pointer rounded-xl bg-purple-600"
    >
      {isRecording ? (
        <img src={"/public/audio.svg"} className="size-8" />
      ) : (
        <AudioOutlined className="text-4xl text-white" />
      )}
    </div>
  );
};

export default VoiceRecorder;
