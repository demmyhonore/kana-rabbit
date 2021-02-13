import React, { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet } from "react-native";

import * as kanaEnum from "../enum/kana";
import * as answerEnum from "../enum/answer";
import { getCurrentKana } from "../utils/kana";
import { useSettings } from "../context/settings";
import { useKana } from "../context/kana";
import { useAnswer } from "../hooks/use-answer";
import Screen from "../components/screen";
import CurrentKana from "../components/current-kana";
import KanaInput from "../components/kana-input";

export default function KanaScreen() {
  const [settings] = useSettings();
  const [kana, dispatch] = useKana();
  const [answer, onAnswerChange, clearAnswer] = useAnswer();
  const [answerStatus, setAnswerStatus] = useState(answerEnum.status.PENDING);
  const currentKana = getCurrentKana(kana);

  const dispatchAndResetAnswer = (action) => {
    dispatch(action);
    clearAnswer();
    setAnswerStatus(answerEnum.status.PENDING);
  };

  useEffect(() => {
    const hasAnswer = answer.length === currentKana?.sound?.length;
    const isCorrect = answer === currentKana?.sound;

    if (hasAnswer) {
      if (isCorrect) {
        setAnswerStatus(answerEnum.status.CORRECT);
      }

      if (!isCorrect && answerStatus === answerEnum.status.PENDING) {
        setAnswerStatus(answerEnum.status.FIRST_ATTEMPT);
        clearAnswer();
      }

      if (!isCorrect && answerStatus === answerEnum.status.FIRST_ATTEMPT) {
        setAnswerStatus(answerEnum.status.SECOND_ATTEMPT);
      }
    }
  }, [answer]);

  useEffect(() => {
    if (answerStatus === answerEnum.status.CORRECT) {
      dispatch({ type: kanaEnum.actionTypes.PROMOTE_CURRENT });
      dispatchAndResetAnswer({
        type: kanaEnum.actionTypes.SET_CURRENT,
        payload: { kanaNewCount: settings.kanaNewCount },
      });
    }

    if (answerStatus === answerEnum.status.WRONG) {
      dispatch({ type: kanaEnum.actionTypes.DEMOTE_CURRENT });
      dispatchAndResetAnswer({
        type: kanaEnum.actionTypes.SET_CURRENT,
        payload: { kanaNewCount: settings.kanaNewCount },
      });
    }
  }, [answerStatus]);

  if (!currentKana) {
    return (
      <Screen style={styles.screen}>
        <Text>ALL KANA HAS BEEN CLEARED</Text>
      </Screen>
    );
  }

  if (answerStatus === answerEnum.status.SECOND_ATTEMPT) {
    return (
      <Screen style={styles.screen}>
        <Text>The correct answer is {currentKana.sound}</Text>
        <Button
          onPress={() => {
            setAnswerStatus(answerEnum.status.WRONG);
          }}
          title="Gimme next kana"
          color="#841584"
        />
      </Screen>
    );
  }

  return (
    <Screen style={styles.screen} avoidKeyboard>
      <CurrentKana kana={currentKana} />
      <View style={styles.inputRow}>
        <KanaInput
          value={answer}
          onChange={onAnswerChange}
          placeholder="Guess the kana sound!"
          maxLength={currentKana.sound.length}
        />
        {answerStatus === answerEnum.status.FIRST_ATTEMPT && (
          <Text style={styles.tryAgain}>Try again!</Text>
        )}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
  },
  inputRow: {
    flexDirection: "row",
  },
  tryAgain: {
    color: "red",
    marginLeft: 8,
  },
});
