function tokenize(text: string): string[] {
  return text.toLowerCase().match(/\b(\w+)\b/g) || []
}

function wordFrequency(words: string[]): Record<string, number> {
  return words.reduce((freq, word) => {
    freq[word] = (freq[word] || 0) + 1
    return freq
  }, {} as Record<string, number>)
}

function dotProduct(
  vec1: Record<string, number>,
  vec2: Record<string, number>
): number {
  return Object.keys(vec1).reduce((sum, key) => {
    return sum + vec1[key] * (vec2[key] || 0)
  }, 0)
}

function magnitude(vec: Record<string, number>): number {
  return Math.sqrt(Object.values(vec).reduce((sum, val) => sum + val * val, 0))
}

export function cosineSimilarity(text1: string, text2: string) {
  const words1 = tokenize(text1)
  const words2 = tokenize(text2)

  const freq1 = wordFrequency(words1)
  const freq2 = wordFrequency(words2)

  const dotProd = dotProduct(freq1, freq2)
  const mag1 = magnitude(freq1)
  const mag2 = magnitude(freq2)

  return (dotProd / (mag1 * mag2) * 100).toFixed(2)
}

// Example usage
const paragraph1 = "This is a sample paragraph for comparison."
const paragraph2 = "This paragraph is a sample for comparing text."

const similarity = cosineSimilarity(paragraph1, paragraph2)
console.log(`Cosine Similarity: ${similarity}`)

export function compareParagraphs(paragraph1: string, paragraph2: string) {
  // Tokenize and normalize the paragraphs
  const words1 = paragraph1.toLowerCase().match(/\b\w+\b/g) || [];
  const words2 = paragraph2.toLowerCase().match(/\b\w+\b/g) || [];

  // Create a set of words from the first paragraph
  const set1 = new Set(words1);

  // Count matching words
  const matches = words2.filter(word => set1.has(word)).length;
  console.log("🚀 ~ compareParagraphs ~ matches:", matches)
  console.log("🚀 ~ compareParagraphs ~ words1.length:", words1.length)

  // Calculate the percentage of matches
  const percentage = (matches / words1.length) * 100;

  return percentage.toFixed(2); // Return percentage with two decimal places
}
