import { useWalletClient } from "wagmi"
import web3 from "web3"
import {
  TokenManagement
} from "../../services/tokenManagement"

import React, { useState } from "react"
import Container from "../../container"
import { Button, Modal } from 'antd';


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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [txHash, setTxHash] = useState<string>("")

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const claimToken = async () => {
    try {
      if (!data?.account.address) return
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
      setTxHash(hash)
      showModal()
    } catch (error) {
      console.log(error)
    }
  }

  const handleCopyTxHash = () => {
    navigator.clipboard.writeText(txHash)
  }
  return (
    <Container>
      <div className="flex flex-col w-full gap-y-2">
        <button onClick={claimToken}>Claim</button>
      </div>
      <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <div className="flex justify-center">
          <p>Tx Hash: {txHash}</p>
          <Button onClick={handleCopyTxHash}>Copy</Button>
        </div>
      </Modal>
    </Container>
  )
}

export default RewardsBoard
