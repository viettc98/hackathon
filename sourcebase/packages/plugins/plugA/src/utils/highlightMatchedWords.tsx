import React from "react"

export const highlightMatchedWords = (text: string, wordsToHighlight: string[]) => {
    const regex = new RegExp(`\\b(${wordsToHighlight.join("|")})\\b`, "gi")
    const parts = text.split(regex)

    return (
      <>
        {parts.map((part, index) =>
          wordsToHighlight.includes(part.toLowerCase()) ? (
            <span key={index} className="highlight text-info">
              {part}
            </span>
          ) : (
            <span key={index} className="text-error">{part}</span>
          )
        )}
      </>
    )
  } 