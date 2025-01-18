export const highlightMatchedWords = (text: string, wordsToHighlight: string[]) => {
    const regex = new RegExp(`\\b(${wordsToHighlight.join("|")})\\b`, "gi")
    const parts = text.split(regex)

    return (
      <>
        {parts.map((part, index) =>
          wordsToHighlight.includes(part.toLowerCase()) ? (
            <span key={index} className="highlight text-blue">
              {part}
            </span>
          ) : (
            <span key={index} className="text-red">{part}</span>
          )
        )}
      </>
    )
  } 