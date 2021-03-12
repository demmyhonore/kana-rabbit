import React, { useState, useEffect, useCallback } from 'react';
import * as Linking from 'expo-linking';
import { Audio } from 'expo-av';

import * as kanaEnum from '../enum/kana';
import * as answerEnum from '../enum/answer';
import * as settingsEnum from '../enum/settings';
import { getCurrentKana } from '../utils/kana';
import { debounce } from '../utils/general';
import { useSettings } from '../context/settings';
import { useKana } from '../context/kana';
import { useAnswer } from '../hooks/use-answer';
import InputScreen from '../components/guess-kana/input-screen';
import AnswerScreen from '../components/guess-kana/answer-screen';
import EndScreen from '../components/guess-kana/end-screen';

export default function GuessKanaScreen({ navigation }) {
  const [settings, dispatchSettings] = useSettings();
  const [kana, dispatchKana] = useKana();
  const [sound, setSound] = useState();
  const [answer, onAnswerChange, clearAnswer] = useAnswer();
  const [answerStatus, setAnswerStatus] = useState(answerEnum.status.PENDING);
  const currentKana = getCurrentKana(kana);
  const currentKanaSound = currentKana?.audio;

  const playSound = async currentSound => {
    if (!currentSound) return null;

    const { sound } = await Audio.Sound.createAsync(currentSound);
    setSound(sound);

    await sound.playAsync();
  };

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  const handleRestartPress = () => navigation.popToTop();

  const handleSoundTogglePress = () => {
    settings.kanaSoundOn
      ? dispatchSettings({ type: settingsEnum.actionTypes.SET_SOUND_OFF })
      : dispatchSettings({ type: settingsEnum.actionTypes.SET_SOUND_ON });
  };

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
    }, settings.kanaFeedbackDuration);
  };

  useEffect(() => {
    let isMounted = true;
    const hasAnswer = answer.length === currentKana?.sound?.length;
    const isCorrectAnswer = answer === currentKana?.sound;
    handleAnswer(
      hasAnswer,
      answerStatus,
      isCorrectAnswer,
      settings.kanaSoundOn && currentKanaSound,
      isMounted
    );

    return () => {
      isMounted = false;
    };
  }, [answer]);

  const handleAnswer = useCallback(
    debounce(
      (
        hasAnswer,
        answerStatus,
        isCorrectAnswer,
        currentKanaSound,
        isMounted
      ) => {
        const isSubmitted =
          answerStatus === answerEnum.status.CORRECT_ANSWER_FEEDBACK;
        const isPendingStatus = answerStatus === answerEnum.status.PENDING;
        const isFirstAttemptStatus =
          answerStatus === answerEnum.status.FIRST_ATTEMPT;

        if (hasAnswer) {
          if (isCorrectAnswer && !isSubmitted) {
            setAnswerStatus(answerEnum.status.CORRECT_ANSWER_FEEDBACK);
            playSound(currentKanaSound);
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
      },
      750
    ),
    []
  );

  useEffect(() => {
    const isCorrectStatus = answerStatus === answerEnum.status.CORRECT;
    const isWrongStatus = answerStatus === answerEnum.status.WRONG;

    if (isCorrectStatus) {
      dispatchKana({ type: kanaEnum.actionTypes.PROMOTE_CURRENT });
      dispatchKana({
        type: kanaEnum.actionTypes.SET_CURRENT,
        payload: { kanaAddNewAmount: settings.kanaAddNewAmount },
      });
      clearAnswerAndSetPendingStatus();
    }

    if (isWrongStatus) {
      dispatchKana({ type: kanaEnum.actionTypes.DEMOTE_CURRENT });
      dispatchKana({
        type: kanaEnum.actionTypes.SET_CURRENT,
        payload: { kanaAddNewAmount: settings.kanaAddNewAmount },
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
        onSoundTogglePress={handleSoundTogglePress}
        soundOn={settings.kanaSoundOn}
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
        onSoundTogglePress={handleSoundTogglePress}
        soundOn={settings.kanaSoundOn}
      />
    );
  }

  if (answerStatus === answerEnum.status.SECOND_ATTEMPT) {
    return (
      <AnswerScreen
        onPlaySoundPress={() => playSound(currentKanaSound)}
        onContinuePress={() => setAnswerStatus(answerEnum.status.WRONG)}
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
      onSoundTogglePress={handleSoundTogglePress}
      soundOn={settings.kanaSoundOn}
    />
  );
}
