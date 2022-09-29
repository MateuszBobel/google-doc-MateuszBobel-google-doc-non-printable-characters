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
          "removeAllNonPrintableCharactersFromDoc"
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
