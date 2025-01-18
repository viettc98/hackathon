import React, { PropsWithChildren, useState } from "react";
import { VoiceContext } from "./context/VoiceContext";

const VoiceProvider = ({ children }: PropsWithChildren) => {
  const [inputVoice, setInputVoice] = useState<string>("");
  const [isRecording, setIsRecording] = useState<boolean>(false);
  return (
    <VoiceContext.Provider
      value={{ inputVoice, setIsRecording, isRecording }}
    >
      {children}
    </VoiceContext.Provider>
  );
};

export default VoiceProvider;
