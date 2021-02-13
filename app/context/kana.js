import React, { createContext, useReducer } from "react";

import allKana from "../assets/kana";
import * as settingsEnum from "../enum/settings";
import * as kanaEnum from "../enum/kana";
import {
  addNewAndSetCurrentKana,
  shuffleKana,
  promoteCurrentKana,
  demoteCurrentKana,
  removeCurrentKana,
  setCurrentKana,
  kanaHasStatus,
} from "../utils/kana";
import { useSettings } from "./settings";

const KanaContext = createContext();
KanaContext.displayName = "KanaContext";

function reducer(kana, action) {
  switch (action.type) {
    case kanaEnum.actionTypes.PROMOTE_CURRENT:
      return promoteCurrentKana(kana);
    case kanaEnum.actionTypes.DEMOTE_CURRENT:
      return demoteCurrentKana(kana);
    case kanaEnum.actionTypes.SET_CURRENT:
      if (kanaHasStatus(kana, kanaEnum.status.NEW))
        return setCurrentKana(kana, kanaEnum.status.NEW);
      if (kanaHasStatus(kana, kanaEnum.status.WRONG))
        return setCurrentKana(kana, kanaEnum.status.WRONG);
      if (kanaHasStatus(kana, kanaEnum.status.CORRECT))
        return setCurrentKana(kana, kanaEnum.status.CORRECT);
      if (kanaHasStatus(kana, kanaEnum.status.IDLE)) {
        return addNewAndSetCurrentKana(kana, action.payload.kanaNewCount);
      } else {
        return removeCurrentKana(kana);
      }
    default:
      throw new Error();
  }
}

function KanaProvider(props) {
  const [settings] = useSettings();
  const [kana, dispatch] = useReducer(reducer, null, () => {
    const initialKana =
      settings.kanaOrder === settingsEnum.kanaOrder.NEWBIE
        ? allKana
        : shuffleKana(allKana);

    return addNewAndSetCurrentKana(initialKana, settings.kanaNewCount);
  });

  const value = [kana, dispatch];

  return <KanaContext.Provider value={value} {...props} />;
}

function useKana() {
  const context = React.useContext(KanaContext);
  if (context === undefined) {
    throw new Error(`useKana must be used within a KanaProvider`);
  }
  return context;
}

export { KanaProvider, useKana };
