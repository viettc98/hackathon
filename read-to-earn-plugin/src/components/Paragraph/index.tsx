import { useVoice } from "../../providers/VoiceProvider"
import { highlightMatchedWords } from "../../utils/highlightMatchedWords"
import { compareParagraphs } from "../../utils/matchedFunc"
import { removePunctuationAndQuotation } from "../../utils/stringToParagraph"

const Paragraph = () => {
  const { script, finalTranscript } = useVoice()
  return (
    <div className="rounded-lg text-center max-h-full mx-10 p-4 overflow-auto text-2xl bg-white/15">
      {finalTranscript ? (
        <>
          <p>Result: {compareParagraphs(script, finalTranscript)}%</p>
          {highlightMatchedWords(
            finalTranscript,
            removePunctuationAndQuotation(script.toLowerCase()).split(" ")
          )}
        </>
      ) : (
        script
      )}
    </div>
  )
}

export default Paragraph
