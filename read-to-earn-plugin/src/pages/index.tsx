import { useNavigationContext } from "../hooks/useNavigationContext";
import RewardsBoard from "./RewardsBoard";
import Adventure from "./Adventure";

const Page = () => {
  const { currentTab } = useNavigationContext();
  return (
    <div
      className="flex items-center justify-center"
    >
      {currentTab === "adventure" ? <Adventure /> : <RewardsBoard />}
    </div>
  );
};

export default Page;
