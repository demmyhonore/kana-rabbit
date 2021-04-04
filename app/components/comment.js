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
        isTablet && styles.tablet,
        isSmall && styles.small,
        isSmall && isTablet && styles.smallTablet,
        customStyle,
      ]}
      numberOfLines={isSmall ? 1 : undefined}
    >
      {text}
    </Text>
  );
}

const styles = StyleSheet.create({
  root: {
    fontFamily: 'Lemon_400Regular',
    fontSize: 50,
    lineHeight: 50,
    textAlign: 'left',
    color: defaultStyles.colors.white,
  },
  tablet: {
    fontSize: 80,
    lineHeight: 80,
  },
  small: {
    fontSize: 30,
    lineHeight: 30,
  },
  smallTablet: {
    fontSize: 50,
    lineHeight: 50,
  },
});

Comment.propTypes = {
  text: PropTypes.string,
  isSmall: PropTypes.bool,
};
