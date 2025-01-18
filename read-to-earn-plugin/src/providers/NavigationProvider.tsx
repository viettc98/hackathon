import { PropsWithChildren, useState } from "react";
import { NavigationContext } from "./context/NavigationContext";

export type ITabType = "dashboard" | "adventure";

const NavigationProvider = ({ children }: PropsWithChildren) => {
  const [currentTab, setCurrentTab] = useState<ITabType>("adventure");
  return (
    <NavigationContext.Provider value={{ currentTab, setCurrentTab }}>
      {children}
    </NavigationContext.Provider>
  );
};

export default NavigationProvider;
