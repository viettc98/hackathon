import { useContext } from "react"
import { VoiceContext } from "../providers/context/VoiceContext"

export const useVoiceContext = () => {
    const context = useContext(VoiceContext)
    if (!context) {
        throw new Error('useVoiceContext only within VoiceProvider')
    }
    return context
}