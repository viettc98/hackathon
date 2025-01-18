import React, { PropsWithChildren, useState } from "react";

export interface IVoiceProvider {
  inputVoice: string;
}

const VoiceProviderContext = React.createContext({} as IVoiceProvider);

const VoiceProvider = ({ children }: PropsWithChildren) => {
  const [inputVoice, setInputVoice] = useState<string>("");
  return (
    <VoiceProviderContext.Provider value={{ inputVoice }}>
      {children}
    </VoiceProviderContext.Provider>
  );
};

export default VoiceProvider;
