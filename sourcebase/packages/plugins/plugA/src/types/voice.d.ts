declare global {
    interface Window {
      webkitSpeechRecognition: typeof SpeechRecognition
    }
  
    interface SpeechRecognition extends EventTarget {
      continuous: boolean
      interimResults: boolean
      lang: string
      start(): void
      stop(): void
      onstart: ((this: SpeechRecognition, ev: Event) => any) | null
      onerror:
        | ((this: SpeechRecognition, ev: SpeechRecognitionErrorEvent) => any)
        | null
      onend: ((this: SpeechRecognition, ev: Event) => any) | null
      onresult:
        | ((this: SpeechRecognition, ev: SpeechRecognitionEvent) => any)
        | null
    }
  
    interface SpeechRecognitionErrorEvent extends Event {
      error: "no-speech" | "audio-capture" | "not-allowed"
    }
  
    interface SpeechRecognitionEvent extends Event {
      resultIndex: number
      results: SpeechRecognitionResultList
    }
  
    interface SpeechRecognitionResultList {
      length: number
      item(index: number): SpeechRecognitionResult
      [index: number]: SpeechRecognitionResult
    }
  
    interface SpeechRecognitionResult {
      isFinal: boolean
      length: number
      item(index: number): SpeechRecognitionAlternative
      [index: number]: SpeechRecognitionAlternative
    }
  
    interface SpeechRecognitionAlternative {
      transcript: string
      confidence: number
    }
  }
  
  export {}
  