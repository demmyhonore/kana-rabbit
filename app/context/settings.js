import React, { createContext, useReducer } from "react";

import * as settingsEnum from "../enum/settings";

const SettingsContext = createContext();
SettingsContext.displayName = "SettingsContext";

function reducer(settings, action) {
  switch (action.type) {
    case settingsEnum.actionTypes.SELECT_KANA:
      return { ...settings, selectedKana: action.payload };
    case settingsEnum.actionTypes.SELECT_LEARNING_MODE:
      return { ...settings, learningMode: action.payload };
    default:
      throw new Error();
  }
}

const initialSettings = {
  selectedKana: [settingsEnum.kanaType.HIRAGANA],
  learningMode: settingsEnum.learningMode.NEWBIE_WAY,
  amountNewKana: 5,
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
