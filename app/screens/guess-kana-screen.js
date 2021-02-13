import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";

import * as kanaEnum from "../enum/kana";
import * as answerEnum from "../enum/answer";
import defaultStyles from "../config/styles";

import { getCurrentKana } from "../utils/kana";
import { useSettings } from "../context/settings";
import { useKana } from "../context/kana";
import { useAnswer } from "../hooks/use-answer";

import Screen from "../components/screen";
import Comment from "../components/comment";
import KanaText from "../components/kana-text";
import KanaInput from "../components/kana-input";
import Action from "../components/action";

export default function GuessKanaScreen() {
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
        setAnswerStatus(answerEnum.status.SHOW_CORRECT_ANSWER);
        setTimeout(() => {
          setAnswerStatus(answerEnum.status.CORRECT);
        }, settings.showCorrectAnswerDuration);
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
        <Comment
          containerStyle={styles.commentAtCenter}
          textStyle={styles.commentText}
          text="GOOD job! You finished all the kana!"
        />
      </Screen>
    );
  }

  if (answerStatus === answerEnum.status.SHOW_CORRECT_ANSWER) {
    return (
      <Screen style={styles.screen} avoidKeyboard>
        <Comment
          containerStyle={styles.commentAtTop}
          textStyle={styles.commentText}
          text="You.. are good!"
        />
        <KanaText style={styles.currentKana} text={currentKana.symbol} />
        <KanaInput
          style={[styles.kanaInput, styles.inputCorrect]}
          placeholder="???"
          answer={answer}
          answerLength={currentKana.sound.length}
          caretHidden
        />
      </Screen>
    );
  }

  if (answerStatus === answerEnum.status.FIRST_ATTEMPT) {
    return (
      <Screen style={styles.screen} avoidKeyboard>
        <Comment
          containerStyle={styles.commentAtTop}
          textStyle={styles.commentText}
          text="Shh.. try again.."
        />
        <KanaText style={styles.currentKana} text={currentKana.symbol} />
        <KanaInput
          style={[styles.kanaInput, styles.inputWrong]}
          placeholder="???"
          answer={answer}
          onAnswerChange={onAnswerChange}
          answerLength={currentKana.sound.length}
        />
      </Screen>
    );
  }

  if (answerStatus === answerEnum.status.SECOND_ATTEMPT) {
    return (
      <Screen style={styles.screen}>
        <Comment
          containerStyle={styles.commentAtCenter}
          textStyle={styles.commentText}
          text="Oh no.. correct sound is: "
          answer={currentKana.sound}
        />
        <Action
          style={styles.action}
          onPress={() => setAnswerStatus(answerEnum.status.WRONG)}
          text="Continue"
        />
      </Screen>
    );
  }

  return (
    <Screen style={styles.screen} avoidKeyboard>
      <Comment
        containerStyle={styles.commentAtTop}
        textStyle={styles.commentText}
        text="Yes... ?"
      />
      <KanaText style={styles.currentKana} text={currentKana.symbol} />
      <KanaInput
        style={styles.kanaInput}
        placeholder="???"
        answer={answer}
        onAnswerChange={onAnswerChange}
        answerLength={currentKana.sound.length}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    alignItems: "center",
    backgroundColor: defaultStyles.colors.grayishViolet,
    padding: defaultStyles.spacing.s3,
  },
  commentAtTop: {
    marginTop: defaultStyles.spacing.s2,
    marginBottom: defaultStyles.spacing.s0,
    fontSize: 45,
    lineHeight: 55,
  },
  commentText: {
    fontSize: 45,
    lineHeight: 55,
  },
  currentKana: {
    marginTop: "auto",
    marginBottom: "auto",
    fontSize: 200,
    color: defaultStyles.colors.white,
  },
  kanaInput: {
    marginBottom: defaultStyles.spacing.s3,
  },
  inputCorrect: {
    backgroundColor: defaultStyles.colors.paleLimeGreen,
  },
  inputWrong: {
    backgroundColor: defaultStyles.colors.carnationPink,
  },
  commentAtCenter: {
    marginTop: "auto",
    marginBottom: "auto",
  },
  action: {
    marginBottom: defaultStyles.spacing.s3,
  },
});
