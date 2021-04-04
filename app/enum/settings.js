const actionTypes = {
  SET_KANA_TYPES: 'setKanaTypes',
  SET_KANA_ORDER: 'setKanaOrder',
  SET_SOUND_ON: 'setSoundOn',
  SET_SOUND_OFF: 'setSoundOff',
};

const kanaType = {
  HIRAGANA: 'hiragana',
  KATAKANA: 'katakana',
  WITH_MARKS: 'withMarks',
  COMBINED: 'combined',
};

const kanaOrder = {
  RANDOM: 'random',
  NEWBIE: 'newbie',
};

export { actionTypes, kanaType, kanaOrder };
