import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';

import defaultStyles from '../../config/styles';
import RegularScreen from '../regular-screen';
import Comment from '../comment';
import Action from '../action';

function GuessKanaAnswerScreen({ onPress, currentKana, commentText }) {
  return (
    <RegularScreen>
      <View>
        <Comment style={styles.comment} text={commentText} />
        <Comment style={[styles.comment, styles.correctSound]} text={currentKana.sound} />
      </View>
      <Action onPress={onPress} text='Continue' />
    </RegularScreen>
  );
}

const styles = StyleSheet.create({
  comment: {
    textAlign: 'center',
  },
  correctSound: {
    color: defaultStyles.colors.paleLimeGreen,
    textDecorationLine: 'underline',
  },
});

export default GuessKanaAnswerScreen;

GuessKanaAnswerScreen.propTypes = {
  onPress: PropTypes.func,
  currentKana: PropTypes.object,
  commentText: PropTypes.string,
};
