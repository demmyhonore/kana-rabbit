import React, { createContext, useReducer } from "react";

import allKana from "../data/kana";
import * as kanaEnum from "../enum/kana";
import {
  addNewAndSetCurrentKana,
  promoteCurrentKana,
  demoteCurrentKana,
  removeCurrentKana,
  setCurrentKana,
  hasNewCategory,
  hasWrongCategory,
  hasCorrectCategory,
  hasIdleCategory,
} from "../utils/kana";

const amountNewKana = 5;

const KanaContext = createContext();
KanaContext.displayName = "KanaContext";

function reducer(kana, action) {
  switch (action.type) {
    case kanaEnum.actionTypes.PROMOTE_CURRENT:
      return promoteCurrentKana(kana);
    case kanaEnum.actionTypes.DEMOTE_CURRENT:
      return demoteCurrentKana(kana);
    case kanaEnum.actionTypes.SET_CURRENT:
      if (hasNewCategory(kana))
        return setCurrentKana(kana, kanaEnum.status.NEW);
      if (hasWrongCategory(kana))
        return setCurrentKana(kana, kanaEnum.status.WRONG);
      if (hasCorrectCategory(kana))
        return setCurrentKana(kana, kanaEnum.status.CORRECT);
      if (hasIdleCategory(kana)) {
        return addNewAndSetCurrentKana(kana, amountNewKana);
      } else {
        return removeCurrentKana(kana);
      }
    default:
      throw new Error();
  }
}

function KanaProvider(props) {
  const [kana, dispatch] = useReducer(reducer, null, () =>
    addNewAndSetCurrentKana(allKana, amountNewKana)
  );

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
