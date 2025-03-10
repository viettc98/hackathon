import React from "react";

export interface IWalletContext {
    connect: () => void
    account: string | undefined;
    isConnected: boolean;
    setIsConnected: (value: boolean) => void
}

export const WalletContext = React.createContext({} as IWalletContext);