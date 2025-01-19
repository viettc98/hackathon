import React, { PropsWithChildren } from "react";
const Container = ({ children }: PropsWithChildren) => {
  return (
    <div
      className="flex flex-col items-center overflow-hidden rounded-md p-2 pb-0 border border-gray-300"
    >
      <div className="w-full">
        {children}
      </div>
      {/* <div className="w-full flex-none">
        <Navigation />
      </div> */}
    </div>
  );
};

export default Container;
