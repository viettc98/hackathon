import { useWalletClient } from "wagmi";
import Container from "../../container";
import {
  contractAddress,
  TokenManagement,
} from "../../services/tokenManagement";
import { ethers } from "ethers";
import web3 from 'web3'


const rewards = [
  {
    tokenReward: "0.9Book",
    accuracyPercentage: "90%",
    timestamp: 1737195143296,
    level: "Easy",
  },
  {
    tokenReward: "0.3Book",
    accuracyPercentage: "30%",
    timestamp: 1737195143296,
    level: "Hard",
  },
];

const RewardsBoard = () => {
  const { data } = useWalletClient();
  const claimToken = async () => {
    try {
      if (!data?.account.address) return;
      const address = data?.account.address;
      const amount = web3.utils.toWei(1, 18);
      const service = new TokenManagement();
      const messageHash = ethers.utils.keccak256(
        ethers.utils.solidityPack(
          ["address", "uint256", "address"],
          [address ,amount, contractAddress]
        )
      );
      const ethSignedMessageHash = ethers.utils.hashMessage(
        ethers.utils.arrayify(messageHash)
      );
      const signedMsg = await data?.signMessage({
        message: ethSignedMessageHash,
      });
      console.log('signedMsg', signedMsg)

      const hash = await service.claimToken({
        signature: signedMsg,
        userAddress: data?.account.address,
        amount,
        onSendTx: data?.sendTransaction
      });
      alert(hash)
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Container>
      <div className="flex flex-col w-full gap-y-2">
        {rewards.map((reward, index) => {
          return (
            <div key={index} className="flex w-full">
              <div className="flex flex-col">
                <div>Rewards</div>
                <div>{reward.tokenReward}</div>
              </div>
              <div className="flex flex-col">
                <div>Accuracy</div>
                <div>{reward.accuracyPercentage}</div>
              </div>
              <div className="flex flex-col">
                <div>Level</div>
                <div>{reward.level}</div>
              </div>
              <div className="flex flex-col">
                <div>Timestamp</div>
                <div>{reward.timestamp}</div>
              </div>
            </div>
          );
        })}
        <button onClick={claimToken}>Claim</button>
      </div>
    </Container>
  );
};

export default RewardsBoard;
