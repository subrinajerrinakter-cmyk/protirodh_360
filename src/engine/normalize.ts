// Normalization and text offset tracking for multilingual processing
// Handles Bangla, Banglish, and English unicode normalization, zero-width chars, and punctuation.

export interface NormalizedResult {
  original: string;
  normalized: string;
  tokens: string[];
  charMap: number[]; // maps each char in normalized string back to index in original
}

// Zero-width characters common in complex scripts & formatting
const ZERO_WIDTH_REGEX = /[\u200B-\u200D\uFEFF]/g;

export function normalizeText(text: string): NormalizedResult {
  if (!text) {
    return { original: '', normalized: '', tokens: [], charMap: [] };
  }

  // Unicode NFKC normalization
  const nfkc = text.normalize('NFKC');

  // Build character map while removing invisible formatting
  let normalized = '';
  const charMap: number[] = [];

  for (let i = 0; i < nfkc.length; i++) {
    const char = nfkc[i];
    if (!char.match(ZERO_WIDTH_REGEX)) {
      normalized += char.toLowerCase();
      charMap.push(i);
    }
  }

  // Tokenize preserving mixed scripts and words
  // Regex matches consecutive word characters including Bengali range \u0980-\u09FF
  const tokenRegex = /[\p{L}\p{N}]+/gu;
  const tokens: string[] = [];
  let match;
  while ((match = tokenRegex.exec(normalized)) !== null) {
    tokens.push(match[0]);
  }

  return {
    original: text,
    normalized,
    tokens,
    charMap,
  };
}

export function findSpansInOriginal(
  original: string,
  normalized: string,
  charMap: number[],
  matchStartInNorm: number,
  matchEndInNorm: number
): { start: number; end: number; snippet: string } {
  const origStart = charMap[matchStartInNorm] ?? 0;
  const origEnd = (charMap[matchEndInNorm - 1] ?? origStart) + 1;
  return {
    start: Math.max(0, origStart),
    end: Math.min(original.length, origEnd),
    snippet: original.slice(origStart, origEnd),
  };
}
