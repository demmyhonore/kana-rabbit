import React from 'react';
import PropTypes from 'prop-types';
import { Text, StyleSheet } from 'react-native';

import defaultStyles from '../config/styles';
import { useDetectTablet } from '../hooks/use-detect-tablet';

export default function Comment({ text, isSmall, style: customStyle }) {
  const isTablet = useDetectTablet();

  return (
    <Text
      style={[
        styles.root,
        isSmall && styles.small,
        isTablet && styles.tablet,
        isTablet && isSmall && styles.smallTablet,
        customStyle,
      ]}
    >
      {text}
    </Text>
  );
}

const styles = StyleSheet.create({
  root: {
    fontFamily: 'Lemon_400Regular',
    fontSize: 65,
    lineHeight: 75,
    textAlign: 'center',
    color: defaultStyles.colors.white,
  },
  small: {
    fontSize: 40,
    lineHeight: 50,
  },
  tablet: {
    fontSize: 100,
    lineHeight: 120,
  },
  smallTablet: {
    fontSize: 65,
    lineHeight: 75,
  },
});

Comment.propTypes = {
  text: PropTypes.string,
  isSmall: PropTypes.bool,
};
