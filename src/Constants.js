const emptyParagraphCharacter = "❡";
const endParagraphCharacter = "¶";
const newLineCharacter = "⏎";
const pageBreakCharacter = "↡";
const simplySpaceCharacter = "▪";
const tabulationCharacter = "￫";

const nonPrintableCharacters = [
  emptyParagraphCharacter,
  endParagraphCharacter,
  newLineCharacter,
  pageBreakCharacter,
  simplySpaceCharacter,
  tabulationCharacter,
];

const newLineEscapeCharacterRegex = /\r|\n/;
