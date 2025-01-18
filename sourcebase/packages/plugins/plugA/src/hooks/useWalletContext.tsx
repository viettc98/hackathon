import { useContext } from "react"
import { WalletContext } from "../providers/context/WalletContext"

export const useWalletContext = () => {
    const context = useContext(WalletContext)
    if (!context) {
        throw new Error('useWalletContext only within VoiceProvider')
    }
    return context
}