import { PropsWithChildren } from "react";
import Navigation from "./Navigation";
import { BorderRadius, Color } from "../styles/configStyle";
const Container = ({ children }: PropsWithChildren) => {
  return (
    <div
      className="flex flex-col items-center overflow-hidden rounded-md p-5"
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
      <div className="w-full flex flex-none" style={{ width: "100%" }}>
        <Navigation />
      </div>
    </div>
  );
};

export default Container;
