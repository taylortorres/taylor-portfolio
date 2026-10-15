// Splits text into what a reader sees as characters (grapheme clusters), so
// an emoji or kaomoji piece, even a multi-part one, types as one.
export function graphemes(text: string): string[] {
  if (typeof Intl !== "undefined" && "Segmenter" in Intl) {
    return Array.from(new Intl.Segmenter(undefined, { granularity: "grapheme" }).segment(text), (s) => s.segment);
  }
  return Array.from(text);
}
