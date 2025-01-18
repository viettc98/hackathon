import { getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PropsWithChildren } from "react";
import { WagmiProvider } from "wagmi";
import { mainnet } from "wagmi/chains";

const config = getDefaultConfig({
  appName: "Read To Earn",
  projectId: "READ_TO_EARN",
  chains: [mainnet],
  ssr: true, // If your dApp uses server side rendering (SSR)
});

const queryClient = new QueryClient();

const WalletAdapterProvider = ({ children }: PropsWithChildren) => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>{children}</RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};

export default WalletAdapterProvider;
