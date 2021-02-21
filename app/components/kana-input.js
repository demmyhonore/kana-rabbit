import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, TextInput } from 'react-native';

import defaultStyles from '../config/styles';
import { useDetectTablet } from '../hooks/use-detect-tablet';

export default function KanaInput({
  style: customStyle,
  answer,
  onAnswerChange,
  answerLength,
  caretHidden,
}) {
  const isTablet = useDetectTablet();

  return (
    <TextInput
      style={[styles.root, isTablet && styles.tablet, customStyle]}
      placeholder='???'
      value={answer}
      onChangeText={onAnswerChange}
      maxLength={answerLength}
      caretHidden={caretHidden}
      autoCorrect={false}
      autoCapitalize='none'
      textContentType='none'
      testID='kana-input'
      autoFocus
    />
  );
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: defaultStyles.colors.white,
    fontFamily: 'LexendMega_400Regular',
    color: defaultStyles.colors.blue,
    fontSize: 24,
    textAlign: 'center',
    width: 80,
    height: 55,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  tablet: {
    fontSize: 40,
    width: 140,
    height: 90,
  },
});

KanaInput.propTypes = {
  answer: PropTypes.string,
  onAnswerChange: PropTypes.func,
  answerLength: PropTypes.number,
  caretHidden: PropTypes.bool,
};
