import React from 'react';
import { useVoice } from '../../providers/VoiceProvider';
import { highlightMatchedWords } from '../../utils/highlightMatchedWords';
import { removePunctuationAndQuotation } from '../../utils/stringToParagraph';

const Paragraph = () => {
  const { result, script, finalTranscript } = useVoice();
  return (
    <div className="rounded-lg text-center mx-2 max-w-full p-4 text-wrap overflow-auto text-xl bg-white/15">
      {result ? (
        <>
          <p>Result: {result}%</p>
          {highlightMatchedWords(
            script,
            removePunctuationAndQuotation(finalTranscript.toLowerCase()).split(" ")
          )}
        </>
      ) : (
        script
      )}
    </div>
  );
};

export default Paragraph;
