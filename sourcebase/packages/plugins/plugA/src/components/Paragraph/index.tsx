import React from "react"
import { useVoice } from "../../providers/VoiceProvider"
import { highlightMatchedWords } from "../../utils/highlightMatchedWords"
import { cosineSimilarity } from "../../utils/matchedFunc"
import { removePunctuationAndQuotation } from "../../utils/stringToParagraph"

const Paragraph = () => {
  const { script, finalTranscript } = useVoice()
  return (
    <div className="rounded-lg text-center max-h-full mx-2 max-w-full p-4 text-wrap overflow-auto text-xl bg-white/15">
      {finalTranscript ? (
        <>
          <p>Result: {cosineSimilarity(script, finalTranscript)}%</p>
          {highlightMatchedWords(
            script,
            removePunctuationAndQuotation(finalTranscript.toLowerCase()).split(" ")
          )}
        </>
      ) : (
        script
      )}
    </div>
  )
}

export default Paragraph
