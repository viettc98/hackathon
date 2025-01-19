import Container from '../../container';
import VoiceRecorder from '../../components/VoiceRecorder';
import Paragraph from '../../components/Paragraph';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import React from 'react';
import { useAccount } from 'wagmi';

const formatAddress = (value: string) => {
  return (
    value.substring(0, 5) +
    '...' +
    value.substring(value.length - 5, value.length)
  );
};

const Adventure = () => {
  const { isConnected  } = useAccount();

  return (
    <Container>
      <div className="flex flex-col items-center min-w-96 overflow-hidden h-full">
        {!isConnected ? (
          <div
            className="flex flex-1 flex-col gap-y-2 items-center justify-center"
            style={{ margin: '16px auto' }}
          >
            <div className='text-xl text-wrap px-4 text-center'>
              Read to earn that empowers users and open the door to new worlds
            </div>
            {<ConnectButton />}
          </div>
        ) : (
          <>
            <div className="flex flex-col w-full items-center h-3/4">
              <ConnectButton />
              <Paragraph />
            </div>
            <div className="flex h-1/4 py-4">
              <VoiceRecorder />
            </div>
          </>
        )}
      </div>
    </Container>
  );
};

export default Adventure;
