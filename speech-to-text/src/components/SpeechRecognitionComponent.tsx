// "use client"
// import { LANGUAGES, RANDOM_SPEECH } from "@/app/constants"
// import { compareParagraphs } from "@/utils/matchedFunc"
// import { removePunctuationAndQuotation } from "@/utils/stringToParagraph"
// import React, { useState, useEffect, useMemo } from "react"


// const SpeechRecognitionComponent: React.FC = () => {
//   const [langs] = useState(LANGUAGES)

//   const [selectedLanguage, setSelectedLanguage] = useState(0)
//   const [selectedDialect, setSelectedDialect] = useState(0)
//   const [finalTranscript, setFinalTranscript] = useState("")
//   const [interimTranscript, setInterimTranscript] = useState("")
//   const [recognizing, setRecognizing] = useState(false)
//   const [recognition, setRecognition] = useState<SpeechRecognition | null>(null)

//   const [randomSpeechNumber, setRandomSpeechNumber] = useState(0)

//   useEffect(() => {
//     // setRandomSpeechNumber(Math.floor(Math.random() * RANDOM_SPEECH.length))
//   }, [])

//   useEffect(() => {
//     if (!("webkitSpeechRecognition" in window)) {
//       alert("Web Speech API is not supported in this browser.")
//     } else {
//       const recognitionInstance = new (window as any).webkitSpeechRecognition()
//       recognitionInstance.continuous = true
//       recognitionInstance.interimResults = true

//       recognitionInstance.onstart = () => {
//         setRecognizing(true)
//       }

//       recognitionInstance.onerror = (event: SpeechRecognitionErrorEvent) => {
//         if (
//           event.error === "no-speech" ||
//           event.error === "audio-capture" ||
//           event.error === "not-allowed"
//         ) {
//           setRecognizing(false)
//         }
//       }

//       recognitionInstance.onend = () => {
//         setRecognizing(false)
//       }

//       recognitionInstance.onresult = (event: SpeechRecognitionEvent) => {
//         let interim = ""
//         let final = ""
//         for (let i = event.resultIndex; i < event.results.length; ++i) {
//           if (event.results[i].isFinal) {
//             final += event.results[i][0].transcript
//           } else {
//             interim += event.results[i][0].transcript
//           }
//         }
//         setFinalTranscript((prevWords) => {
//           return prevWords + final
//         })
//         setInterimTranscript(interim)
//       }

//       setRecognition(recognitionInstance)
//     }
//   }, [])

//   const startRecognition = () => {
//     if (recognition) {
//       if (recognizing) {
//         recognition.stop()
//       } else {
//         setFinalTranscript("")
//         setInterimTranscript("")
//         recognition.lang = langs[selectedLanguage][selectedDialect + 1][0]
//         recognition.start()
//       }
//     }
//   }

//   const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     setSelectedLanguage(parseInt(e.target.value))
//     setSelectedDialect(0)
//   }

//   const handleDialectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     setSelectedDialect(parseInt(e.target.value))
//   }

//   const speechToText = useMemo(() => {
//     return RANDOM_SPEECH[randomSpeechNumber]
//   }, [randomSpeechNumber])
//   console.log()

//   const highlightMatchedWords = (text: string, wordsToHighlight: string[]) => {
//     const regex = new RegExp(`\\b(${wordsToHighlight.join("|")})\\b`, "gi")
//     const parts = text.split(regex)

//     return (
//       <>
//         {parts.map((part, index) =>
//           wordsToHighlight.includes(part.toLowerCase()) ? (
//             <span key={index} className="highlight text-blue">
//               {part}
//             </span>
//           ) : (
//             part
//           )
//         )}
//       </>
//     )
//   }

//   return (
//     <div>
//       {highlightMatchedWords("this is a match word", ["match word", "this"])}
//       <div>
//         <h3 className="text-xl font-bold">Reading this paragraph out loud</h3>
//         <p>{speechToText}</p>
//       </div>
//       <select value={selectedLanguage} onChange={handleLanguageChange}>
//         {langs.map((lang, index) => (
//           <option key={index} value={index}>
//             {lang[0]}
//           </option>
//         ))}
//       </select>
//       <select value={selectedDialect} onChange={handleDialectChange}>
//         {langs[selectedLanguage].slice(1).map((dialect, index) => (
//           <option key={index} value={index}>
//             {dialect[1]}
//           </option>
//         ))}
//       </select>
//       <button onClick={startRecognition}>
//         {recognizing ? "Stop" : "Start"}
//       </button>
//       <div>
//         <h3 className="text-xl font-bold">Final Transcript:</h3>
//         <p>{finalTranscript}</p>
//         <h3 className="text-xl font-bold">Interim Transcript:</h3>
//         <p>{interimTranscript}</p>
//         {finalTranscript && (
//           <>
//             <p>Result: {compareParagraphs(speechToText, finalTranscript)}%</p>
//             <p>
//               Matched words:
//               {highlightMatchedWords(
//                 finalTranscript,
//                 removePunctuationAndQuotation(speechToText.toLowerCase()).split(" ")
//               )}
//             </p>
//           </>
//         )}
//       </div>
//     </div>
//   )
// }

// export default SpeechRecognitionComponent
