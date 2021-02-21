import React, { useState, useEffect } from 'react';

import * as kanaEnum from '../enum/kana';
import * as answerEnum from '../enum/answer';
import { getCurrentKana } from '../utils/kana';
import { useSettings } from '../context/settings';
import { useKana } from '../context/kana';
import { useAnswer } from '../hooks/use-answer';
import InputScreen from '../components/guess-kana/input-screen';
import AnswerScreen from '../components/guess-kana/answer-screen';
import EndScreen from '../components/guess-kana/end-screen';

export default function GuessKanaScreen() {
  const [settings] = useSettings();
  const [kana, dispatch] = useKana();
  const [answer, onAnswerChange, clearAnswer] = useAnswer();
  const [answerStatus, setAnswerStatus] = useState(answerEnum.status.PENDING);
  const currentKana = getCurrentKana(kana);

  const dispatchAndResetAnswer = action => {
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
    return <EndScreen onMailPress={() => ''} onRestartPress={() => ''} />;
  }

  if (answerStatus === answerEnum.status.SHOW_CORRECT_ANSWER) {
    return (
      <InputScreen
        currentKana={currentKana}
        answer={answer}
        commentText='Very good!'
        answerStatus={answerStatus}
        onAnswerChange={onAnswerChange}
        onRestartPress={() => ''}
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
        onRestartPress={() => ''}
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
      onRestartPress={() => ''}
    />
  );
}
