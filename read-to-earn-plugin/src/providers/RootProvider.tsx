import { PropsWithChildren } from "react";
import VoiceProvider from "./VoiceProvider";
import {
  createNetworkConfig,
  SuiClientProvider,
  WalletProvider,
} from "@mysten/dapp-kit";
import { getFullnodeUrl } from "@mysten/sui/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import NavigationProvider from "./NavigationProvider";

const { networkConfig } = createNetworkConfig({
  localnet: { url: getFullnodeUrl("localnet") },
  mainnet: { url: getFullnodeUrl("mainnet") },
});
const queryClient = new QueryClient();

const RootProvider = ({ children }: PropsWithChildren) => {
  return (
    <QueryClientProvider client={queryClient}>
      <SuiClientProvider networks={networkConfig} defaultNetwork="localnet">
        <WalletProvider>
          <NavigationProvider>
            <VoiceProvider>{children}</VoiceProvider>
          </NavigationProvider>
        </WalletProvider>
      </SuiClientProvider>
    </QueryClientProvider>
  );
};
export default RootProvider;
