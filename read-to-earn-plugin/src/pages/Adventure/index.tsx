import { ConnectButton } from "@mysten/dapp-kit";
import Container from "../../container";
import VoiceRecorder from "../../components/VoiceRecorder";
import Paragraph from "../../components/Paragraph";

const Adventure = () => {
  return (
    <Container>
      <div className="flex flex-col items-center">
        <div className="flex flex-1" style={{ margin: "16px auto" }}>
          <ConnectButton />
        </div>
        <div className="flex flex-none">
          <Paragraph />
        </div>
        <div className="flex flex-1">
          <VoiceRecorder />
        </div>
      </div>
    </Container>
  );
};

export default Adventure;
