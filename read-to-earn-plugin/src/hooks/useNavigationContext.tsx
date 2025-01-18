import { useContext } from "react"
import { NavigationContext } from "../providers/context/NavigationContext"

export const useNavigationContext = () => {
    const context = useContext(NavigationContext)
    if (!context) {
        throw new Error('useNavigationContext only within NavigationProvider')
    }
    return context
}