import { ITabType } from "../../providers/NavigationProvider";
import { CustomerServiceOutlined, ProfileOutlined } from "@ant-design/icons";
import { useNavigationContext } from "../../hooks/useNavigationContext";
import clsx from "clsx";

const NavigationTab = [
  {
    component: CustomerServiceOutlined,
    key: "adventure",
  },
  {
    component: ProfileOutlined,
    key: "dashboard",
  },
];

const Navigation = () => {
  const { setCurrentTab, currentTab } = useNavigationContext();
  const activateTab = (tabName: ITabType) => {
    setCurrentTab(tabName);
  };

  const handleChangeTab = (key: string) => () => {
    // if (key === "dashboard") {
      activateTab("dashboard");
    // }
    // activateTab("adventure");
  };

  return (
    <div className="w-full flex items-center justify-between">
      {NavigationTab.map((item) => {
        const { key, component: Component } = item;
        const isActive = currentTab === key;
        return (
          <div
            className="flex-1 cursor-pointer flex flex-col items-center justify-center"
            onClick={handleChangeTab(key)}
            key={key}
          >
            <Component
              className={clsx("text-2xl", {
                "text-purple-500": isActive,
              })}
            />
            <p
              className={clsx('capitalize py-2', {
                "text-purple-500": isActive,
              })}
            >
              {key}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default Navigation;
