import React from 'react';
import { useVoice } from '../../providers/VoiceProvider';
import { highlightMatchedWords } from '../../utils/highlightMatchedWords';
import { removePunctuationAndQuotation } from '../../utils/stringToParagraph';

const Paragraph = () => {
  const { result, script, finalTranscript } = useVoice();
  return (
    <div className="rounded-lg text-center mx-2 max-w-full p-4 text-wrap overflow-auto text-xl bg-white/15">
      {/* {result ? (
        <>
          <p>Result: {result}%</p>
          {highlightMatchedWords(
            script,
            removePunctuationAndQuotation(finalTranscript.toLowerCase()).split(" ")
          )}
        </>
      ) : (
        script
      )} */}
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique laboriosam neque unde libero. Doloribus amet id libero perspiciatis quod, nesciunt reiciendis nulla commodi modi asperiores inventore, consequuntur ab voluptatibus temporibus dolore veritatis, harum debitis esse. Eveniet iste eaque, molestias modi nemo porro omnis nulla mollitia saepe facere? Aliquam tenetur commodi quas reiciendis ea deleniti praesentium voluptates laborum ab, accusantium beatae possimus corporis officia odit maiores dicta. Totam soluta deleniti sint voluptatem, rem dolor, tenetur odio ipsa, quidem pariatur accusantium possimus facere! Labore omnis iste sequi nisi nesciunt non error facilis consequatur quam minus. Eos magnam accusamus magni illo sed praesentium!
    </div>
  );
};

export default Paragraph;
