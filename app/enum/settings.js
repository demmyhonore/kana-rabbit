const actionTypes = {
  SELECT_KANA_TYPE: "selectKanaType",
  SELECT_KANA_ORDER: "selectKanaOrder",
};

const kanaType = {
  HIRAGANA: "hiragana",
  KATAKANA: "katakana",
  WITH_MARKS: "withMarks",
  COMBINED: "combined",
};

const kanaOrder = {
  RANDOM: "random",
  NEWBIE: "newbie",
};

export { actionTypes, kanaType, kanaOrder };
