import React, {
  PropsWithChildren,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { RANDOM_SPEECH } from '../constants';
import { handleGetVoiceData } from '../utils/handleGetVoiceData';
import { compareToPercentage, cosineSimilarity } from '../utils/matchedFunc';
import { useWalletClient } from 'wagmi';
import { TokenManagement } from '../services/tokenManagement';
import web3 from 'web3';
import { Button, Modal } from 'antd';
import { CopyOutlined } from '@ant-design/icons';

export interface IVoiceProvider {
  inputVoice: string;
  showModal: () => void;
  setInputVoice: (inputVoice: string) => void;
  finalTranscript: string;
  setFinalTranscript: (finalTranscript: string) => void;
  script: string;
  setScript: (script: string) => void;
  recognition: SpeechRecognition | null;
  setRecognition: (recognition: SpeechRecognition | null) => void;
  audioBlob: Blob | null;
  setAudioBlob: (audioBlob: Blob | null) => void;
  startRecording: () => void;
  stopRecording: () => void;
  isRecording: boolean;
  setIsRecording: (isRecording: boolean) => void;
  reset: () => void;
  result: string | null;
  percentage: number | null;
  isLoading: boolean;
  isClaimable: boolean;
  handleClaimToken: () => void;
  tokenToClaim: number;
}

const VoiceProviderContext = React.createContext({} as IVoiceProvider);

const VoiceProvider = ({ children }: PropsWithChildren) => {
  const [inputVoice, setInputVoice] = useState<string>('');
  const [finalTranscript, setFinalTranscript] = useState<string>('');
  const [script, setScript] = useState<string>('');
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { data } = useWalletClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [txHash, setTxHash] = useState<string>('');
  const [tokenToClaim, setTokenToClaim] = useState<number>(0);


  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const claimToken = async (amountParams: number) => {
    try {
      if (!data?.account.address) return;
      const amount = web3.utils.toWei(amountParams, 18);
      const service = new TokenManagement();

      const hash = await service.claimToken({
        userAddress: data?.account.address,
        amount: Number(amount),
        onSendTx: data?.sendTransaction,
      });
      setTxHash(hash);
      showModal();
    } catch (error) {
      console.log(error);
    }
  };

  const { percentage, result } = useMemo(() => {
    const percentage = finalTranscript ? cosineSimilarity(script, finalTranscript) : null
    return {
      percentage,
      result: percentage ? compareToPercentage(percentage) : null,
    };
  }, [script, finalTranscript]);

  const [recognition, setRecognition] = useState<SpeechRecognition | null>(
    null
  );
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);

  const stopRecording = () => {
    if (!recognition) return;
    recognition.stop();
  };

  const startRecording = async () => {
    if (!recognition) return;

    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mediaRecorder = new MediaRecorder(stream);
    const audioChunks: BlobPart[] = [];

    mediaRecorder.ondataavailable = (event) => {
      audioChunks.push(event.data);
    };

    mediaRecorder.onstop = async () => {
      const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
      console.log('🚀 ~ mediaRecorder.onstop= ~ audioBlob:', audioBlob);
      setIsLoading(true);
      const transcript = await handleGetVoiceData(audioBlob);
      if (!transcript) return;
      setAudioBlob(audioBlob);
      setFinalTranscript(transcript);
      setIsLoading(false);
    };

    mediaRecorder.start();
    recognition.start();

    recognition.onend = () => {
      mediaRecorder.stop();
    };
  };

  const handleClaimToken = () => {
    if (!percentage) return;
    let tokenToClaim = 0;
    if (percentage > 80) {
      tokenToClaim = 3;
    } else if (percentage > 50) {
      tokenToClaim = 2;
    } else if (percentage > 30) {
      tokenToClaim = 1;
    }
    claimToken(tokenToClaim);

    setTokenToClaim(tokenToClaim)
  }

  const isClaimable = useMemo(() => {
    return !!(percentage && percentage > 30);
  }, [percentage]);

  const reset = () => {
    setFinalTranscript('');
    setScript(RANDOM_SPEECH[Math.floor(Math.random() * RANDOM_SPEECH.length)]);
    setAudioBlob(null);
    setIsRecording(false);
  };

  useEffect(() => {
    // Init app state
    if (!('webkitSpeechRecognition' in window)) {
      alert('Web Speech API is not supported in this browser.');
      return;
    }

    const recognitionInstance = new (window as any).webkitSpeechRecognition();
    recognitionInstance.continuous = true;
    recognitionInstance.interimResults = true;
    setRecognition(recognitionInstance);
    setScript(RANDOM_SPEECH[Math.floor(Math.random() * RANDOM_SPEECH.length)]);
  }, []);
  return (
    <VoiceProviderContext.Provider
      value={{
        tokenToClaim,
        isClaimable,
        handleClaimToken,
        percentage,
        result,
        reset,
        isRecording,
        setIsRecording,
        stopRecording,
        startRecording,
        inputVoice,
        setInputVoice,
        finalTranscript,
        setFinalTranscript,
        script,
        setScript,
        recognition,
        setRecognition,
        audioBlob,
        setAudioBlob,
        showModal,
        isLoading,
      }}
    >
      {children}
      <Modal
        title="Claim Successfully"
        open={isModalOpen}
        onCancel={handleCancel}
        okButtonProps={{ style: { display: 'none' } }}
      >
        <div className="flex flex-col justify-center">
          <div className="text-sm">
            <p className="text-success">You're able to claim {tokenToClaim} Books</p>
            <a target="_blank" href={`https://sepolia.etherscan.io/tx/${txHash}`}>
              {txHash}
            </a>
          </div>
        </div>
      </Modal>
    </VoiceProviderContext.Provider>
  );
};

export const useVoice = () => {
  const context = useContext(VoiceProviderContext);
  if (!context) {
    throw new Error('useVoice must be used within a VoiceProvider');
  }
  return context;
};

export default VoiceProvider;
