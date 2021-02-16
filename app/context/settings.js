import React, { createContext, useReducer } from "react";

import * as settingsEnum from "../enum/settings";

const SettingsContext = createContext();
SettingsContext.displayName = "SettingsContext";

function reducer(settings, action) {
  switch (action.type) {
    case settingsEnum.actionTypes.SET_KANA_TYPES:
      return { ...settings, kanaTypes: action.payload };
    case settingsEnum.actionTypes.SET_KANA_ORDER:
      return { ...settings, kanaOrder: action.payload };
    default:
      throw new Error();
  }
}

const initialSettings = {
  kanaTypes: {
    [settingsEnum.kanaType.HIRAGANA]: true,
    [settingsEnum.kanaType.KATAKANA]: false,
    [settingsEnum.kanaType.WITH_MARKS]: false,
    [settingsEnum.kanaType.COMBINED]: false,
  },
  kanaOrder: settingsEnum.kanaOrder.NEWBIE,
  kanaNewCount: 5,
  showCorrectAnswerDuration: 1000,
};

function SettingsProvider(props) {
  const [settings, dispatch] = useReducer(reducer, initialSettings);

  const value = [settings, dispatch];

  return <SettingsContext.Provider value={value} {...props} />;
}

function useSettings() {
  const context = React.useContext(SettingsContext);
  if (context === undefined) {
    throw new Error(`useSettings must be used within a SettingsProvider`);
  }
  return context;
}

export { SettingsProvider, useSettings };
