import React from "react";
import { ITabType } from "../NavigationProvider";

export interface INavigationProvider {
  currentTab: ITabType;
  setCurrentTab: (newTab: ITabType) => void;
}

export const NavigationContext = React.createContext({} as INavigationProvider);
