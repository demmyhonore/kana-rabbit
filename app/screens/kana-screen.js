import React, { useState, useEffect } from "react";
import { Text, StyleSheet } from "react-native";

import * as kanaEnum from "../enum/kana";
import { getCurrentKana } from "../utils/kana";
import { useKana } from "../context/kana";
import Screen from "../components/screen";
import CurrentKana from "../components/current-kana";
import KanaInput from "../components/kana-input";

export default function KanaScreen() {
  const [kana, dispatch] = useKana();
  const [answer, setAnswer] = useState("");
  const currentKana = getCurrentKana(kana);

  const dispatchAndClearAnswer = ({ type }) => {
    dispatch({ type });
    setAnswer("");
  };

  useEffect(() => {
    if (currentKana) {
      const hasAnswer = answer.length === currentKana.sound.length;
      const isCorrect = answer === currentKana.sound;

      if (hasAnswer && isCorrect) {
        dispatch({ type: kanaEnum.actionTypes.PROMOTE_CURRENT });
        dispatchAndClearAnswer({ type: kanaEnum.actionTypes.SET_CURRENT });
      }

      if (hasAnswer && !isCorrect) {
        dispatchAndClearAnswer({ type: kanaEnum.actionTypes.DEMOTE_CURRENT });
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
