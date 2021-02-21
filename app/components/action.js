import React from 'react';
import PropTypes from 'prop-types';
import { Text, TouchableHighlight, StyleSheet } from 'react-native';

import defaultStyles from '../config/styles';
import { useDetectTablet } from '../hooks/use-detect-tablet';

export default function Action({
  style: customStyle,
  text,
  onPress,
  isDisabled,
}) {
  const isTablet = useDetectTablet();

  return (
    <TouchableHighlight
      style={[
        styles.root,
        isTablet && styles.rootTablet,
        isDisabled && styles.disabled,
        customStyle,
      ]}
      onPress={isDisabled ? undefined : onPress}
      underlayColor={defaultStyles.colors.green}
    >
      <Text style={[styles.text, isTablet && styles.textTablet]}>{text}</Text>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: defaultStyles.colors.paleLimeGreen,
    height: 55,
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: defaultStyles.spacing.s3,
    paddingRight: defaultStyles.spacing.s3,
  },
  rootTablet: {
    height: 90,
  },
  disabled: {
    backgroundColor: defaultStyles.colors.lightGray,
  },
  text: {
    fontFamily: 'LexendMega_400Regular',
    textTransform: 'lowercase',
    color: defaultStyles.colors.blue,
    fontSize: 24,
  },
  textTablet: {
    fontSize: 40,
  },
});

Action.propTypes = {
  text: PropTypes.string,
  onPress: PropTypes.func,
  isDisabled: PropTypes.bool,
};
