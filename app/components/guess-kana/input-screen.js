import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';

import * as settingsEnum from '../../enum/settings';
import * as answerEnum from '../../enum/answer';
import defaultStyles from '../../config/styles';
import KeyboardScreen from '../keyboard-screen';
import Comment from '../comment';
import CurrentKana from '../current-kana';
import KanaInput from '../kana-input';
import IconButton from '../icon-button';

function GuessKanaInputScreen({
  currentKana,
  answer,
  commentText,
  answerStatus,
  onAnswerChange,
  onRestartPress,
}) {
  const isFirstAttempt = answerStatus === answerEnum.status.FIRST_ATTEMPT;
  const isCorrectAnswer =
    answerStatus === answerEnum.status.SHOW_CORRECT_ANSWER;

  return (
    <KeyboardScreen>
      <Comment text={commentText} isSmall />
      <View style={styles.center}>
        <CurrentKana
          kana={currentKana.symbol}
          isCombined={currentKana.type === settingsEnum.kanaType.COMBINED}
        />
        <IconButton
          style={styles.iconRestart}
          name='restart'
          onPress={onRestartPress}
        />
      </View>
      <KanaInput
        style={[
          isFirstAttempt && styles.inputWrong,
          isCorrectAnswer && styles.inputCorrect,
        ]}
        answer={answer}
        onAnswerChange={onAnswerChange}
        answerLength={currentKana.sound.length}
      />
    </KeyboardScreen>
  );
}

const styles = StyleSheet.create({
  center: {
    justifyContent: 'center',
    width: '100%',
  },
  iconRestart: {
    position: 'absolute',
    right: 0,
  },
  inputCorrect: {
    backgroundColor: defaultStyles.colors.paleLimeGreen,
  },
  inputWrong: {
    backgroundColor: defaultStyles.colors.carnationPink,
  },
});

export default GuessKanaInputScreen;

GuessKanaInputScreen.propTypes = {
  currentKana: PropTypes.object,
  answer: PropTypes.string,
  commentText: PropTypes.string,
  answerStatus: PropTypes.string,
  onAnswerChange: PropTypes.func,
  onRestartPress: PropTypes.func,
};
