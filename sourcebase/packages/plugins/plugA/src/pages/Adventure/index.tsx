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
      <div className="flex flex-col items-center">
        <div className="flex flex-none" style={{ margin: '16px auto' }}>
          {<ConnectButton />}
        </div>

        <div className="flex w-full">
          <Paragraph />
        </div>
        {isConnected && (
          <div className="flex flex-1 mt-4">
            <VoiceRecorder />
          </div>
        )}
      </div>
    </Container>
  );
};

export default Adventure;
