import React, { PropsWithChildren, useState } from "react";
import { VoiceProviderContext } from "./context/VoiceContext";

const VoiceProvider = ({ children }: PropsWithChildren) => {
  const [inputVoice, setInputVoice] = useState<string>("");
  const [isRecording, setIsRecording] = useState<boolean>(false);
  return (
    <VoiceProviderContext.Provider
      value={{ inputVoice, setIsRecording, isRecording }}
    >
      {children}
    </VoiceProviderContext.Provider>
  );
};

export default VoiceProvider;
