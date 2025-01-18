import Container from "../../container";

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
  return (
    <Container>
      <div className="flex flex-col">
        {rewards.map((reward) => {
          return (
            <div className="flex w-full">
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
      </div>
    </Container>
  );
};

export default RewardsBoard;
