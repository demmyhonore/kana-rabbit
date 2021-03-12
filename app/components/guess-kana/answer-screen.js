import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';

import defaultStyles from '../../config/styles';
import RegularScreen from '../regular-screen';
import Comment from '../comment';
import Action from '../action';
import IconButton from '../icon-button';

function GuessKanaAnswerScreen({
  onContinuePress,
  onPlaySoundPress,
  currentKana,
  commentText,
}) {
  return (
    <RegularScreen>
      <View>
        <Comment style={styles.comment} text={commentText} />
        <View style={styles.answerContainer}>
          <Comment
            style={[styles.comment, styles.commentAnswer]}
            text={currentKana.sound}
          />
          <IconButton
            testID='play-icon'
            name='play'
            onPress={onPlaySoundPress}
          />
        </View>
      </View>
      <Action onPress={onContinuePress} text='Continue' />
    </RegularScreen>
  );
}

const styles = StyleSheet.create({
  comment: {
    textAlign: 'center',
  },
  answerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  commentAnswer: {
    color: defaultStyles.colors.paleLimeGreen,
    textDecorationLine: 'underline',
    marginRight: defaultStyles.spacing.s2,
  },
});

export default GuessKanaAnswerScreen;

GuessKanaAnswerScreen.propTypes = {
  onContinuePress: PropTypes.func,
  onPlaySoundPress: PropTypes.func,
  currentKana: PropTypes.object,
  commentText: PropTypes.string,
};
