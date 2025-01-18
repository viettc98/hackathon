import { useVoice } from "../../providers/VoiceProvider"

const Paragraph = () => {
  const { script } = useVoice()
  return <div className="rounded-lg text-center max-h-full mx-10 p-4 overflow-auto text-2xl bg-white/15">{script}</div>
}

export default Paragraph
