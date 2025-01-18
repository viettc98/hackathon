import { PropsWithChildren } from "react";
import Navigation from "./Navigation";
const Container = ({ children }: PropsWithChildren) => {
  return (
    <div
      className="flex flex-col items-center overflow-hidden rounded-md p-2 pb-0 border border-gray-300"
      style={{
        width: 600,
        height: 400,
      }}
    >
      <div className="flex-1">
        {children}
      </div>
      <div className="w-full flex-none">
        <Navigation />
      </div>
    </div>
  );
};

export default Container;
