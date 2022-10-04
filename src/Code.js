const onOpen = () => {
  const ui = DocumentApp.getUi();
  ui.createMenu("Custom Menu")
    .addItem("📄 Remove all characters", "removeAllNonPrintableCharacters")
    .addItem("📑 Add all characters", "insertAllNonPrintableCharacters")
    .addSeparator()
    .addSubMenu(
      ui
        .createMenu("📄 Remove")
        .addItem(
          `❌ ${emptyParagraphCharacter} empty paragraph characters`,
          "removeEmptyParagraphCharacters"
        )
        .addItem(
          `❌ ${endParagraphCharacter} end paragraph characters`,
          "removeEndParagraphCharacters"
        )
        .addItem(
          `❌ ${newLineCharacter} new line characters`,
          "removeNewLineCharacters"
        )
        .addItem(
          `❌ ${pageBreakCharacter} page break characters`,
          "removePageBreakCharacters"
        )
        .addItem(
          `❌ ${simplySpaceCharacter} simply space characters`,
          "removeSimplySpaceCharacters"
        )
        .addItem(
          `❌ ${tabulationCharacter} tabulation characters`,
          "removeTabulationCharacters"
        )
    )
    .addSubMenu(
      ui
        .createMenu("📑  Add")
        .addItem(
          `✅ ${emptyParagraphCharacter} empty paragraph characters`,
          "insertEmptyParagraphCharacters"
        )
        .addItem(
          `✅ ${endParagraphCharacter} end paragraph characters`,
          "insertEndParagraphCharacters"
        )
        .addItem(
          `✅ ${newLineCharacter} new line characters`,
          "insertNewLineCharacters"
        )
        .addItem(
          `✅ ${pageBreakCharacter} page break characters`,
          "insertPageBreakCharacters"
        )
        .addItem(
          `✅ ${simplySpaceCharacter} simply space characters`,
          "addSimplySpaceCharacter"
        )
        .addItem(
          `✅ ${tabulationCharacter} tabulation characters`,
          "insertTabulationCharacter"
        )
    )
    .addToUi();
};

const getParagraphs = () => {
  const paragraphs = DocumentApp.getActiveDocument().getBody().getParagraphs();
  return paragraphs;
};

const insertCharacterAtIndex = (paragraph, index, character) => {
  paragraph.getChild(0).asText().insertText(index, character);
};

const isPageBrakInParagraph = (paragraph) => {
  return paragraph.findElement(DocumentApp.ElementType.PAGE_BREAK) !== null;
};

const getNonPrintableCharactesIndexes = (string, regex) => {
  const indexes = [];
  for (let index = 0; index < string.length; index++) {
    if (regex.exec(string[index])) {
      indexes.push(index);
    }
  }
  return indexes;
};

const insertNewLineCharacters = () => {
  removeNewLineCharacters();
  const paragraphs = getParagraphs();
  paragraphs.forEach((paragraph) => {
    const text = paragraph.getText();
    const nonPrintableCharactersIndexes = getNonPrintableCharactesIndexes(
      text,
      newLineEscapeCharacterRegex
    );
    nonPrintableCharactersIndexes.forEach((characterIndex, index) => {
      const nextCharacterIndex = characterIndex + index;
      insertCharacterAtIndex(paragraph, nextCharacterIndex, newLineCharacter);
    });
  });
};

const insertEmptyParagraphCharacters = () => {
  removeEmptyParagraphCharacters();
  const paragraphs = getParagraphs();
  paragraphs.forEach((paragraph) => {
    const text = paragraph.getText();
    const isEmpty = text.replace(pageBreakCharacter, "").length === 0;
    if (!isEmpty) return;
    paragraph.insertText(0, emptyParagraphCharacter);
  });
};

const insertEndParagraphCharacters = () => {
  removeEndParagraphCharacters();
  const paragraphs = getParagraphs();
  paragraphs.forEach((paragraph) => {
    const text = paragraph.getText();
    const isEmpty = text.replace(pageBreakCharacter, "").length === 0;
    const hasEmptyParagraphCharacter = text.includes(emptyParagraphCharacter);
    if (isEmpty || hasEmptyParagraphCharacter) return;
    const lastCharacterIndex = text.length;
    insertCharacterAtIndex(
      paragraph,
      lastCharacterIndex,
      endParagraphCharacter
    );
  });
};

const insertPageBreakCharacters = () => {
  removePageBreakCharacters();
  const paragraphs = getParagraphs();
  paragraphs.forEach((paragraph) => {
    const text = paragraph.getText();
    const hasPageBreak = isPageBrakInParagraph(paragraph);
    if (!hasPageBreak) return;
    const isEmpty = text.length === 0;
    if (!isEmpty) {
      const lastCharacterIndex = text.length;
      insertCharacterAtIndex(paragraph, lastCharacterIndex, pageBreakCharacter);
      return;
    }
    paragraph.insertText(0, pageBreakCharacter);
  });
};

const addSimplySpaceCharacter = () => {
  removeSimplySpaceCharacters();
  const paragraphs = getParagraphs();
  paragraphs.forEach((paragraph) => {
    const text = paragraph.getText();
    const isEmpty = text.length === 0;
    if (isEmpty) return;
    paragraph.replaceText(simplySpaceCharacterRE2Regex, simplySpaceCharacter);
  });
};

const insertTabulationCharacter = () => {
  removeTabulationCharacters();
  const paragraphs = getParagraphs();
  paragraphs.forEach((paragraph) => {
    const indentFirstLine = paragraph.getIndentFirstLine();
    if (!indentFirstLine) return;
    const defaultIndentOffset = 36;
    const tabulationCount = indentFirstLine / defaultIndentOffset;
    for (let index = 0; index < tabulationCount; index++) {
      insertCharacterAtIndex(paragraph, index, tabulationCharacter);
    }
  });
};

const replaceTextInParagraphs = (text, replacment = "") => {
  const paragraphs = getParagraphs();
  paragraphs.forEach((paragraph) => paragraph.replaceText(text, replacment));
};

const removeNewLineCharacters = () => {
  replaceTextInParagraphs(newLineCharacter);
};

const removeEmptyParagraphCharacters = () => {
  replaceTextInParagraphs(emptyParagraphCharacter);
};

const removeEndParagraphCharacters = () => {
  replaceTextInParagraphs(endParagraphCharacter);
};

const removePageBreakCharacters = () => {
  replaceTextInParagraphs(pageBreakCharacter);
};

const removeSimplySpaceCharacters = () => {
  replaceTextInParagraphs(simplySpaceCharacter, " ");
};

const removeTabulationCharacters = () => {
  replaceTextInParagraphs(tabulationCharacter);
};

const removeAllNonPrintableCharacters = () => {
  removeSimplySpaceCharacters();
  nonPrintableCharacters.forEach((character) => {
    replaceTextInParagraphs(character);
  });
};
