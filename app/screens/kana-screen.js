import React, { useReducer, useState, useEffect } from "react";
import { Text, StyleSheet } from "react-native";

import allKana from "../data/kana";
import * as kanaEnum from "../enum/kana";
import {
  addNewAndSetCurrentKana,
  promoteCurrentKana,
  demoteCurrentKana,
  removeCurrentKana,
  setCurrentKana,
  getCurrentKana,
  hasNewCategory,
  hasWrongCategory,
  hasCorrectCategory,
  hasIdleCategory,
} from "../utils/kana";

import Screen from "../components/screen";
import CurrentKana from "../components/current-kana";
import KanaInput from "../components/kana-input";

const amountNew = 5;

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
        return addNewAndSetCurrentKana(kana, amountNew);
      } else {
        return removeCurrentKana(kana);
      }
    default:
      throw new Error();
  }
}

export default function KanaScreen() {
  const [kana, dispatch] = useReducer(reducer, null, () =>
    addNewAndSetCurrentKana(allKana, amountNew)
  );
  const [answer, setAnswer] = useState("");
  const currentKana = getCurrentKana(kana);

  useEffect(() => {
    if (currentKana) {
      const hasAnswer = answer.length === currentKana.sound.length;
      const isCorrect = answer === currentKana.sound;

      if (hasAnswer && isCorrect) {
        dispatch({ type: kanaEnum.actionTypes.PROMOTE_CURRENT });
        dispatch({ type: kanaEnum.actionTypes.SET_CURRENT });
        setAnswer("");
      }

      if (hasAnswer && !isCorrect) {
        dispatch({ type: kanaEnum.actionTypes.DEMOTE_CURRENT });
        setAnswer("");
      }
    }
  }, [answer]);

  if (!currentKana) {
    return (
      <Screen style={styles.screen}>
        <Text>YOU HAVE CLEARED ALL THE KANA!</Text>
      </Screen>
    );
  }

  return (
    <Screen style={styles.screen} avoidKeyboard>
      <CurrentKana kana={currentKana} />
      <KanaInput
        value={answer}
        onChange={setAnswer}
        placeholder="Guess the kana!"
        maxLength={currentKana.sound.length}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
  },
});
