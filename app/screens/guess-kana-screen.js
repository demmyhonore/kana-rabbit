import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";

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
import IconButton from "../components/icon-button";

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
          text="Very good!"
        />
        <View style={styles.center}>
          <KanaText style={styles.currentKana} text={currentKana.symbol} />
          <IconButton
            style={styles.restartIcon}
            name="restart"
            onPress={() => ""}
          />
        </View>
        <KanaInput
          style={styles.inputCorrect}
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
          text="Try again.."
        />
        <View style={styles.center}>
          <KanaText style={styles.currentKana} text={currentKana.symbol} />
          <IconButton
            style={styles.restartIcon}
            name="restart"
            onPress={() => ""}
          />
        </View>
        <KanaInput
          style={styles.inputWrong}
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
      <View style={styles.center}>
        <KanaText style={styles.currentKana} text={currentKana.symbol} />
        <IconButton
          style={styles.restartIcon}
          name="restart"
          onPress={() => ""}
        />
      </View>
      <KanaInput
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
    justifyContent: "space-around",
    backgroundColor: defaultStyles.colors.grayishViolet,
    padding: defaultStyles.spacing.s3,
  },
  commentAtTop: {
    marginTop: defaultStyles.spacing.s1,
    marginBottom: defaultStyles.spacing.s0,
  },
  commentText: {
    fontSize: 40,
    lineHeight: 50,
  },
  center: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  currentKana: {
    fontSize: 180,
    color: defaultStyles.colors.white,
  },
  inputCorrect: {
    backgroundColor: defaultStyles.colors.paleLimeGreen,
  },
  inputWrong: {
    backgroundColor: defaultStyles.colors.carnationPink,
  },
  action: {
    marginBottom: defaultStyles.spacing.s3,
  },
  restartIcon: {
    position: "absolute",
    right: 0,
  },
});
