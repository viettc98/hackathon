import { AudioOutlined } from "@ant-design/icons";

const VoiceRecorder = () => {
  return (
    <div
      className="flex size-24 mt-auto items-center justify-center cursor-pointer rounded-xl bg-purple-600"
    >
      <AudioOutlined className="text-4xl text-white" />
    </div>
  );
};

export default VoiceRecorder;
