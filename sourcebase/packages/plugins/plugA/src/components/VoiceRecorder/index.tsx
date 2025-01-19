import { AudioOutlined, ReloadOutlined } from '@ant-design/icons';
import { useVoice } from '../../providers/VoiceProvider';
import React from 'react';

const VoiceRecorder = () => {
  const {
    startRecording,
    stopRecording,
    isRecording,
    setIsRecording,
    reset,
    isLoading,
    handleClaimToken,
    percentage,
    isClaimable,
  } = useVoice();
  const toggleRecordingState = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
    setIsRecording(!isRecording);
  };
  return (
    <div className="flex flex-col gap-2 items-center">
      {percentage && !isClaimable && (
        <div className="text-sm text-error">
          You are need at least to correct 30% to claim
        </div>
      )}
      <div className="flex gap-3 my-2">
        {!isClaimable && (
          <>
            <button
              onClick={toggleRecordingState}
              disabled={isLoading}
              className={`flex size-16 shadow-md mt-auto items-center justify-center cursor-pointer rounded-xl bg-purple-100 ${isLoading ? 'opacity-50' : ''}`}
            >
              {isRecording ? (
                <img src={'/audio.svg'} className="size-10 animate-pulse" />
              ) : (
                <AudioOutlined className="text-4xl" />
              )}
            </button>
            <button
              disabled={isLoading}
              onClick={reset}
              className={`flex size-16 shadow-md mt-auto items-center justify-center cursor-pointer rounded-xl bg-purple-100 ${isLoading ? 'opacity-50' : ''}`}
            >
              <ReloadOutlined className="text-4xl" />
            </button>
          </>
        )}

        {isClaimable && (
          <button
            disabled={isLoading}
            onClick={handleClaimToken}
            className={`flex size-16 shadow-md mt-auto items-center justify-center cursor-pointer rounded-xl bg-purple-100 ${
              isLoading ? 'opacity-50' : ''
            }`}
          >
            Claim
          </button>
        )}
      </div>
    </div>
  );
};

export default VoiceRecorder;
