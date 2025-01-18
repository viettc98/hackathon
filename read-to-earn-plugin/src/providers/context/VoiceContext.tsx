import React from "react";

export interface IVoiceProvider {
    inputVoice: string;
    setIsRecording: (value: boolean) => void;
    isRecording: boolean;
  }

export const VoiceContext = React.createContext({} as IVoiceProvider);
