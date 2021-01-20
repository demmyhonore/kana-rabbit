import React, { useReducer, useState, useEffect } from "react";
import { Text, StyleSheet } from "react-native";

import allKana from "../data/kana";
import kanaStatus from "../enum/kanaStatus";
import kanaActionTypes from "../enum/kanaActionTypes";
import Screen from "../components/Screen";
import CurrentKana from "../components/CurrentKana";
import KanaInput from "../components/KanaInput";

const amountNewKana = 5;

const setNewKana = (kana, amountNewKana, isFirstDraw) => {
  let amountSet = 0;

  return [...kana].reduce((kana, character) => {
    if (
      character.status === kanaStatus.IDLE &&
      amountSet === 0 &&
      isFirstDraw
    ) {
      character.isCurrent = true;
    }

    if (character.status === kanaStatus.IDLE && amountSet < amountNewKana) {
      character.status = kanaStatus.NEW;
      amountSet++;
    }

    return kana.concat(character);
  }, []);
};

const promoteCurrentKana = (kana) => {
  return [...kana].reduce((kana, character) => {
    if (character.isCurrent) {
      character.status =
        character.status !== kanaStatus.CORRECT
          ? kanaStatus.CORRECT
          : kanaStatus.MEMORIZED;
    }

    return kana.concat(character);
  }, []);
};

const demoteCurrentKana = (kana) => {
  return [...kana].reduce((kana, character) => {
    if (character.isCurrent) {
      character.status = kanaStatus.WRONG;
    }

    return kana.concat(character);
  }, []);
};

const removeCurrentKana = (kana) => {
  return [...kana].reduce((kana, character) => {
    if (character.isCurrent) {
      character.isCurrent = false;
    }

    return kana.concat(character);
  }, []);
};

const setCurrentKana = (kana, status) => {
  let isSet = false;
  const kanaWithoutCurrent = removeCurrentKana(kana);

  return [...kanaWithoutCurrent].reduce((kana, character) => {
    if (character.status === status && !isSet) {
      character.isCurrent = true;
      isSet = true;
    }

    return kana.concat(character);
  }, []);
};

const getCurrentKana = (kana) => kana.find((character) => character.isCurrent);

const hasNew = (kana) =>
  kana.some((character) => character.status === kanaStatus.NEW);
const hasWrong = (kana) =>
  kana.some((character) => character.status === kanaStatus.WRONG);
const hasCorrect = (kana) =>
  kana.some((character) => character.status === kanaStatus.CORRECT);
const hasIdle = (kana) =>
  kana.some((character) => character.status === kanaStatus.IDLE);

function reducer(kana, action) {
  switch (action.type) {
    case kanaActionTypes.PROMOTE_CURRENT:
      return promoteCurrentKana(kana);
    case kanaActionTypes.DEMOTE_CURRENT:
      return demoteCurrentKana(kana);
    case kanaActionTypes.SET_CURRENT:
      if (hasNew(kana)) return setCurrentKana(kana, kanaStatus.NEW);
      if (hasWrong(kana)) return setCurrentKana(kana, kanaStatus.WRONG);
      if (hasCorrect(kana)) return setCurrentKana(kana, kanaStatus.CORRECT);
      if (hasIdle(kana)) {
        const kanaWithNew = setNewKana(kana, amountNewKana);
        return setCurrentKana(kanaWithNew, kanaStatus.NEW);
      } else {
        return removeCurrentKana(kana);
      }
    default:
      throw new Error();
  }
}

export default function KanaScreen() {
  const [kana, dispatch] = useReducer(reducer, null, () =>
    setNewKana(allKana, amountNewKana, true)
  );
  const [answer, setAnswer] = useState("");
  const currentKana = getCurrentKana(kana);

  useEffect(() => {
    if (currentKana) {
      const hasAnswer = answer.length === currentKana.sound.length;
      const isCorrect = answer === currentKana.sound;

      if (hasAnswer && isCorrect) {
        dispatch({ type: kanaActionTypes.PROMOTE_CURRENT });
        dispatch({ type: kanaActionTypes.SET_CURRENT });
        setAnswer("");
      }

      if (hasAnswer && !isCorrect) {
        dispatch({ type: kanaActionTypes.DEMOTE_CURRENT });
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
