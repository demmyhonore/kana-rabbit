import React, { createContext, useReducer } from "react";

import allKana from "../data/kana";
import * as kanaEnum from "../enum/kana";
import {
  addNewAndSetCurrentKana,
  promoteCurrentKana,
  demoteCurrentKana,
  removeCurrentKana,
  setCurrentKana,
  hasStatus,
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
      if (hasStatus(kana, kanaEnum.status.NEW))
        return setCurrentKana(kana, kanaEnum.status.NEW);
      if (hasStatus(kana, kanaEnum.status.WRONG))
        return setCurrentKana(kana, kanaEnum.status.WRONG);
      if (hasStatus(kana, kanaEnum.status.CORRECT))
        return setCurrentKana(kana, kanaEnum.status.CORRECT);
      if (hasStatus(kana, kanaEnum.status.IDLE)) {
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
