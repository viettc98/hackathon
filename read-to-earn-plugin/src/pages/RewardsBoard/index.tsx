import { ethers } from "ethers"
import { useWalletClient } from "wagmi"
import web3 from "web3"
import {
  contractAddress,
  TokenManagement,
} from "../../services/tokenManagement"

import Container from "../../container"
import { highlightMatchedWords } from "../../utils/highlightMatchedWords"
import { compareParagraphs } from "../../utils/matchedFunc"
import { removePunctuationAndQuotation } from "../../utils/stringToParagraph"
import { useVoice } from "../../providers/VoiceProvider"

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
  const { data } = useWalletClient()
  const { finalTranscript, script } = useVoice()
  const claimToken = async () => {
    try {
      if (!data?.account.address) return
      const address = data?.account.address
      const amount = web3.utils.toWei(1, 18)
      const service = new TokenManagement()
      // const messageHash = ethers.utils.keccak256(
      //   ethers.utils.solidityPack(
      //     ["address", "uint256", "address"],
      //     [address, amount, contractAddress]
      //   )
      // )
      // const ethSignedMessageHash = ethers.utils.hashMessage(
      //   ethers.utils.arrayify(messageHash)
      // )
      // const signedMsg = await data?.signMessage({
      //   message: ethSignedMessageHash,
      // })
      // console.log("signedMsg", signedMsg)

      const hash = await service.claimToken({
        // signature: signedMsg,
        userAddress: data?.account.address,
        amount: Number(amount),
        onSendTx: data?.sendTransaction,
      })
      alert(hash)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <Container>
      <div className="flex flex-col w-full gap-y-2">
        <p>Result: {compareParagraphs(script, finalTranscript)}%</p>
        {highlightMatchedWords(
          finalTranscript,
          removePunctuationAndQuotation(script.toLowerCase()).split(" ")
        )}
        <button onClick={claimToken}>Claim</button>
      </div>
    </Container>
  )
}

export default RewardsBoard
