export function removePunctuationAndQuotation(text: string): string {
  // Regular expression to match punctuation and quotation marks
  const regex = /[?.,\/#!$%\^&\*;:{}=\-_`~()\"']/g

  // Replace matched characters with an empty string
  console.log("🚀 ~ removePunctuationAndQuotation ~ text:", text.replace(regex, ""))
  return text.replace(regex, "")
}
