import React from 'react';
import PropTypes from 'prop-types';
import { View, Image, StyleSheet } from 'react-native';

import defaultStyles from '../../config/styles';
import { useDetectTablet } from '../../hooks/use-detect-tablet';
import RegularScreen from '../regular-screen';
import Comment from '../comment';
import Text from '../text';
import IconButton from '../icon-button';

function GuessKanaEndScreen({ onMailPress, onRestartPress }) {
  const isTablet = useDetectTablet();

  return (
    <RegularScreen>
      <Comment text='You are good!' />
      <Image
        testID='image'
        style={[styles.image, isTablet && styles.imageTablet]}
        source={require('../../assets/images/snow.jpg')}
        alt='Demmy & Tomo in the snow'
      />
      <Text
        text='Demmy & Tomo in the snow ask: "Can we make kana learning more fun?"'
        isCenter
      />
      <View style={styles.actions}>
        <IconButton
          testID='email-icon'
          style={styles.iconMail}
          name='email'
          onPress={onMailPress}
        />
        <IconButton testID='restart-icon' name='restart' onPress={onRestartPress} />
      </View>
    </RegularScreen>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 270,
    height: 145,
    borderRadius: 20,
  },
  imageTablet: {
    width: 405,
    height: 217,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconMail: {
    marginRight: defaultStyles.spacing.s3,
  },
});

export default GuessKanaEndScreen;

GuessKanaEndScreen.propTypes = {
  onMailPress: PropTypes.func,
  onRestartPress: PropTypes.func,
};
