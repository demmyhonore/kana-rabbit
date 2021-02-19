import React, { useState, useEffect } from "react";
import { View, Image, StyleSheet } from "react-native";

import * as kanaEnum from "../enum/kana";
import * as answerEnum from "../enum/answer";
import * as settingsEnum from "../enum/settings";
import defaultStyles from "../config/styles";

import { getCurrentKana } from "../utils/kana";
import { useSettings } from "../context/settings";
import { useKana } from "../context/kana";
import { useAnswer } from "../hooks/use-answer";
import { useDetectTablet } from "../hooks/use-detect-tablet";

import Screen from "../components/screen";
import Comment from "../components/comment";
import Text from "../components/text";
import KanaText from "../components/kana-text";
import KanaInput from "../components/kana-input";
import Action from "../components/action";
import IconButton from "../components/icon-button";

export default function GuessKanaScreen() {
  const isTablet = useDetectTablet();
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
        <Comment text="You are goowd!!" />
        <Image
          style={[
            styles.demmyAndTomoImage,
            isTablet && styles.demmyAndTomoImageTablet,
          ]}
          source={require("../assets/demmy-and-tomo.jpg")}
        />
        <View>
          <Text
            style={styles.endScreenText}
            text="You found Demmy & Tomo in the snow."
          />
          <Text
            style={styles.endScreenText}
            text="How can we make kana learning more fun for you?"
          />
        </View>
        <View style={styles.actions}>
          <IconButton style={styles.mailIcon} name="email" onPress={() => ""} />
          <IconButton name="restart" onPress={() => ""} />
        </View>
      </Screen>
    );
  }

  if (answerStatus === answerEnum.status.SHOW_CORRECT_ANSWER) {
    return (
      <Screen style={styles.screen} avoidKeyboard>
        <View style={styles.top}>
          <Comment
            textStyle={[
              isTablet ? styles.commentTextTablet : styles.commentText,
            ]}
            text="Very good!"
          />
        </View>
        <View style={[styles.center, isTablet && styles.centerTablet]}>
          <KanaText
            style={[
              styles.currentKana,
              currentKana.type === settingsEnum.kanaType.COMBINED &&
                styles.currentKanaCombined,
              isTablet && styles.currentKanaTablet,
              isTablet &&
                currentKana.type === settingsEnum.kanaType.COMBINED &&
                styles.currentKanaTabletCombined,
            ]}
            text={currentKana.symbol}
          />
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
        <View style={styles.top}>
          <Comment
            textStyle={[
              isTablet ? styles.commentTextTablet : styles.commentText,
            ]}
            text="Try again.."
          />
        </View>
        <View style={[styles.center, isTablet && styles.centerTablet]}>
          <KanaText
            style={[
              styles.currentKana,
              currentKana.type === settingsEnum.kanaType.COMBINED &&
                styles.currentKanaCombined,
              isTablet && styles.currentKanaTablet,
              isTablet &&
                currentKana.type === settingsEnum.kanaType.COMBINED &&
                styles.currentKanaTabletCombined,
            ]}
            text={currentKana.symbol}
          />
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
        <Comment text="Oh no.. correct sound is: " answer={currentKana.sound} />
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
      <View style={styles.top}>
        <Comment
          textStyle={[isTablet ? styles.commentTextTablet : styles.commentText]}
          text="Yes.. ?"
        />
      </View>
      <View style={[styles.center, isTablet && styles.centerTablet]}>
        <KanaText
          style={[
            styles.currentKana,
            currentKana.type === settingsEnum.kanaType.COMBINED &&
              styles.currentKanaCombined,
            isTablet && styles.currentKanaTablet,
            isTablet &&
              currentKana.type === settingsEnum.kanaType.COMBINED &&
              styles.currentKanaTabletCombined,
          ]}
          text={currentKana.symbol}
        />
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
  endScreen: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: defaultStyles.colors.grayishViolet,
    padding: defaultStyles.spacing.s3,
  },
  top: {
    marginBottom: defaultStyles.spacing.s0,
    height: 110,
    alignItems: "center",
    justifyContent: "center",
  },
  character: {
    position: "absolute",
    left: 0,
    width: 60,
    height: 60,
    borderRadius: 50,
    overflow: "hidden",
  },
  commentText: {
    fontSize: 40,
    lineHeight: 50,
  },
  commentTextTablet: {
    fontSize: 65,
    lineHeight: 75,
  },
  center: {
    width: "100%",
    justifyContent: "center",
  },
  endScreenCenter: {
    width: "100%",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "red",
  },
  centerTablet: {
    width: "80%",
  },
  currentKana: {
    fontSize: 180,
    textAlign: "center",
    color: defaultStyles.colors.white,
  },
  currentKanaCombined: {
    fontSize: 120,
  },
  currentKanaTablet: {
    fontSize: 300,
  },
  currentKanaTabletCombined: {
    fontSize: 200,
  },
  demmyAndTomoImage: {
    marginLeft: "auto",
    marginRight: "auto",
    width: 270,
    height: 145,
    borderRadius: 20,
  },
  demmyAndTomoImageTablet: {
    width: 540,
    height: 290,
  },
  endScreenText: {
    textAlign: "center",
    marginBottom: defaultStyles.spacing.s0,
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
  mailIcon: {
    marginRight: defaultStyles.spacing.s3,
  },
  restartIcon: {
    position: "absolute",
    right: 0,
  },
  actions: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
});
