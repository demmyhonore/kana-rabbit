import React, { useState, useEffect, useCallback } from 'react';
import * as Linking from 'expo-linking';

import * as kanaEnum from '../enum/kana';
import * as answerEnum from '../enum/answer';
import { getCurrentKana } from '../utils/kana';
import { debounce } from '../utils/general';
import { useSettings } from '../context/settings';
import { useKana } from '../context/kana';
import { useAnswer } from '../hooks/use-answer';
import InputScreen from '../components/guess-kana/input-screen';
import AnswerScreen from '../components/guess-kana/answer-screen';
import EndScreen from '../components/guess-kana/end-screen';

export default function GuessKanaScreen({ navigation }) {
  const [settings] = useSettings();
  const [kana, dispatch] = useKana();
  const [answer, onAnswerChange, clearAnswer] = useAnswer();
  const [answerStatus, setAnswerStatus] = useState(answerEnum.status.PENDING);
  const currentKana = getCurrentKana(kana);

  const handleRestartPress = () => navigation.popToTop();

  const handleEmailPress = () =>
    Linking.openURL(
      'mailto:kananana@hellosearch.nl?subject=Make kananana more fun by:'
    );

  const clearAnswerAndSetPendingStatus = () => {
    clearAnswer();
    setAnswerStatus(answerEnum.status.PENDING);
  };

  const setCorrectStatusWithDelay = () => {
    setTimeout(() => {
      setAnswerStatus(answerEnum.status.CORRECT);
    }, settings.showCorrectAnswerDuration);
  };

  useEffect(() => {
    let isMounted = true;
    const hasAnswer = answer.length === currentKana?.sound?.length;
    const isCorrectAnswer = answer === currentKana?.sound;
    handleAnswer(hasAnswer, answerStatus, isCorrectAnswer, isMounted);

    return () => {
      isMounted = false;
    };
  }, [answer]);

  const handleAnswer = useCallback(
    debounce((hasAnswer, answerStatus, isCorrectAnswer, isMounted) => {
      const isSubmitted =
        answerStatus === answerEnum.status.CORRECT_ANSWER_FEEDBACK;
      const isPendingStatus = answerStatus === answerEnum.status.PENDING;
      const isFirstAttemptStatus =
        answerStatus === answerEnum.status.FIRST_ATTEMPT;

      if (hasAnswer) {
        if (isCorrectAnswer && !isSubmitted) {
          setAnswerStatus(answerEnum.status.CORRECT_ANSWER_FEEDBACK);
          isMounted && setCorrectStatusWithDelay();
        }

        if (!isCorrectAnswer && isPendingStatus) {
          setAnswerStatus(answerEnum.status.FIRST_ATTEMPT);
          clearAnswer();
        }

        if (!isCorrectAnswer && isFirstAttemptStatus) {
          setAnswerStatus(answerEnum.status.SECOND_ATTEMPT);
        }
      }
    }, 750),
    []
  );

  useEffect(() => {
    const isCorrectStatus = answerStatus === answerEnum.status.CORRECT;
    const isWrongStatus = answerStatus === answerEnum.status.WRONG;

    if (isCorrectStatus) {
      dispatch({ type: kanaEnum.actionTypes.PROMOTE_CURRENT });
      dispatch({
        type: kanaEnum.actionTypes.SET_CURRENT,
        payload: { kanaNewCount: settings.kanaNewCount },
      });
      clearAnswerAndSetPendingStatus();
    }

    if (isWrongStatus) {
      dispatch({ type: kanaEnum.actionTypes.DEMOTE_CURRENT });
      dispatch({
        type: kanaEnum.actionTypes.SET_CURRENT,
        payload: { kanaNewCount: settings.kanaNewCount },
      });
      clearAnswerAndSetPendingStatus();
    }
  }, [answerStatus]);

  if (!currentKana) {
    return (
      <EndScreen
        onMailPress={handleEmailPress}
        onRestartPress={handleRestartPress}
      />
    );
  }

  if (answerStatus === answerEnum.status.CORRECT_ANSWER_FEEDBACK) {
    return (
      <InputScreen
        currentKana={currentKana}
        answer={answer}
        commentText='Very good!'
        answerStatus={answerStatus}
        onRestartPress={handleRestartPress}
      />
    );
  }

  if (answerStatus === answerEnum.status.FIRST_ATTEMPT) {
    return (
      <InputScreen
        currentKana={currentKana}
        answer={answer}
        commentText='Try again..'
        answerStatus={answerStatus}
        onAnswerChange={onAnswerChange}
        onRestartPress={handleRestartPress}
      />
    );
  }

  if (answerStatus === answerEnum.status.SECOND_ATTEMPT) {
    return (
      <AnswerScreen
        onPress={() => setAnswerStatus(answerEnum.status.WRONG)}
        currentKana={currentKana}
        commentText='Oh no.. correct sound is: '
      />
    );
  }

  return (
    <InputScreen
      currentKana={currentKana}
      answer={answer}
      commentText='Yes.. ?'
      onAnswerChange={onAnswerChange}
      onRestartPress={handleRestartPress}
    />
  );
}
