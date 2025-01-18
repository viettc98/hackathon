import Container from "../../container";
import VoiceRecorder from "../../components/VoiceRecorder";
import Paragraph from "../../components/Paragraph";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const Adventure = () => {
  return (
    <Container>
      <div className="flex flex-col items-center">
        <div className="flex flex-none" style={{ margin: "16px auto" }}>
          {<ConnectButton />}
        </div>
        <div className="flex max-h-40">
          <Paragraph />
        </div>
        <div className="flex flex-1 mt-4">
          <VoiceRecorder />
        </div>
      </div>
    </Container>
  );
};

export default Adventure;
