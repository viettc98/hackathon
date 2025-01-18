import { purpleDark } from "@ant-design/colors";
import { AudioOutlined } from "@ant-design/icons";

const VoiceRecorder = () => {
  return (
    <div
      className="flex size-32 items-center justify-center rounded-xl"
      style={{
        backgroundColor: purpleDark.primary,
      }}
    >
      <AudioOutlined className="text-4xl text-white" />
    </div>
  );
};

export default VoiceRecorder;
