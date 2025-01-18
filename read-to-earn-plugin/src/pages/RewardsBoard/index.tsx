import Container from "../../container"
import { useVoice } from "../../providers/VoiceProvider"
import { highlightMatchedWords } from "../../utils/highlightMatchedWords"
import { compareParagraphs } from "../../utils/matchedFunc"
import { removePunctuationAndQuotation } from "../../utils/stringToParagraph"

// const rewards = [
//   {
//     tokenReward: "0.9Book",
//     accuracyPercentage: "90%",
//     timestamp: 1737195143296,
//     level: "Easy",
//   },
//   {
//     tokenReward: "0.3Book",
//     accuracyPercentage: "30%",
//     timestamp: 1737195143296,
//     level: "Hard",
//   },
// ]

const RewardsBoard = () => {
  const { finalTranscript, script } = useVoice()
  return (
    <Container>
      <p>Result: {compareParagraphs(script, finalTranscript)}%</p>
      {highlightMatchedWords(
        finalTranscript,
        removePunctuationAndQuotation(script.toLowerCase()).split(" ")
      )}
    </Container>
  )
}

export default RewardsBoard
