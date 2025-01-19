import { PropsWithChildren } from 'react';
import Navigation from './Navigation';
import React from 'react';
import { useAccount } from 'wagmi';
const Container = ({ children }: PropsWithChildren) => {
  const { isConnected } = useAccount();
  return (
    <div className="flex flex-col items-center overflow-hidden rounded-md p-2 pb-0 border border-gray-300 w-[600px] h-[400px]">
      <div className="w-full h-full">{children}</div>
      {/* {isConnected && (
        <div className="w-full flex-none">
          <Navigation />
        </div>
      )} */}
    </div>
  );
};

export default Container;
