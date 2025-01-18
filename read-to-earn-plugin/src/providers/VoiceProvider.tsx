import React, { PropsWithChildren, useContext, useEffect, useState } from "react";
import { RANDOM_SPEECH } from "../constants";

export interface IVoiceProvider {
  inputVoice: string;
  setInputVoice: (inputVoice: string) => void;
  finalTranscript: string;
  setFinalTranscript: (finalTranscript: string) => void;
  script: string;
  setScript: (script: string) => void;
}

const VoiceProviderContext = React.createContext({} as IVoiceProvider);

const VoiceProvider = ({ children }: PropsWithChildren) => {
  const [inputVoice, setInputVoice] = useState<string>("");
  const [finalTranscript, setFinalTranscript] = useState<string>("");
  const [script, setScript] = useState<string>("");

  useEffect(() => {
    setScript(RANDOM_SPEECH[(Math.floor(Math.random() * RANDOM_SPEECH.length))])
  }, [])
  return (
    <VoiceProviderContext.Provider value={{ inputVoice, setInputVoice, finalTranscript, setFinalTranscript, script, setScript }}>
      {children}
    </VoiceProviderContext.Provider>
  );
};

export const useVoice = () => {
  const context = useContext(VoiceProviderContext)
  if (!context) {
    throw new Error("useVoice must be used within a VoiceProvider")
  }
  return context
}

export default VoiceProvider;
