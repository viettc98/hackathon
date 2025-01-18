import { useNavigationContext } from "../hooks/useNavigationContext";
import RewardsBoard from "./RewardsBoard";
import Adventure from "./Adventure";

const Page = () => {
  const { currentTab } = useNavigationContext();
  return (
    <div
      className="flex items-center justify-center"
      style={{ width: 600, height: 400, margin: "36px auto" }}
    >
      {currentTab === "adventure" ? <Adventure /> : <RewardsBoard />}
    </div>
  );
};

export default Page;
