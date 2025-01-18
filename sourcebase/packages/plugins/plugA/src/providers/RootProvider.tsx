import { PropsWithChildren } from "react";
import VoiceProvider from "./VoiceProvider";
import NavigationProvider from "./NavigationProvider";
import WalletAdapterProvider from "./WalletAdapterProvider";
import React from "react";

const RootProvider = ({ children }: PropsWithChildren) => {
  return (
    <WalletAdapterProvider>
      <NavigationProvider>
        <VoiceProvider>{children}</VoiceProvider>
      </NavigationProvider>
    </WalletAdapterProvider>
  );
};
export default RootProvider;
