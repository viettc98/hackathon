import { PropsWithChildren } from "react";
import Navigation from "./Navigation";
import { BorderRadius, Color } from "../styles/configStyle";
const Container = ({ children }: PropsWithChildren) => {
  return (
    <div
      className="flex flex-col items-center overflow-hidden rounded-md p-2 pb-0"
      style={{
        width: 600,
        height: 400,
        borderRadius: BorderRadius.CARD_BORDER,
        border: "1px solid" + Color.APP_BORDER,
        background: Color.APP_BG,
      }}
    >
      <div className="flex-1 flex">
        {children}
      </div>
      <div className="w-full flex-none">
        <Navigation />
      </div>
    </div>
  );
};

export default Container;
