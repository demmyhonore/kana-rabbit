import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';

import * as settingsEnum from '../../enum/settings';
import * as answerEnum from '../../enum/answer';
import defaultStyles from '../../config/styles';
import { useDetectTablet } from '../../hooks/use-detect-tablet';
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
  onSoundTogglePress,
  soundOn,
}) {
  const isTablet = useDetectTablet();
  const isFirstAttempt = answerStatus === answerEnum.status.FIRST_ATTEMPT;
  const isCorrectAnswer =
    answerStatus === answerEnum.status.CORRECT_ANSWER_FEEDBACK;

  return (
    <KeyboardScreen>
      <View style={[styles.top, isTablet && styles.topTablet]}>
        <Comment text={commentText} isSmall />
        <View style={styles.topActions}>
          <IconButton
            testID='restart-icon'
            style={styles.iconRestart}
            name='restart'
            onPress={onRestartPress}
          />
          <IconButton
            testID={soundOn ? 'volume-icon' : 'volume-off-icon'}
            name={soundOn ? 'volume-medium' : 'volume-off'}
            onPress={onSoundTogglePress}
          />
        </View>
      </View>
      <View>
        <CurrentKana
          kana={currentKana.symbol}
          isCombined={currentKana.type === settingsEnum.kanaType.COMBINED}
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
  top: {
    width: '100%',
    paddingRight: 50,
    minHeight: 100,
  },
  topTablet: {
    paddingRight: 75,
  },
  topActions: {
    position: 'absolute',
    right: 0,
  },
  iconRestart: {
    marginBottom: defaultStyles.spacing.s2,
  },
  inputCorrect: {
    backgroundColor: defaultStyles.colors.paleLimeGreen,
  },
  inputWrong: {
    backgroundColor: defaultStyles.colors.sunDown,
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
  onSoundTogglePress: PropTypes.func,
  soundOn: PropTypes.bool,
};
