import React from 'react';
import PropTypes from 'prop-types';
import { Text as RNText, StyleSheet } from 'react-native';

import defaultStyles from '../config/styles';
import { useDetectTablet } from '../hooks/use-detect-tablet';

export default function Text({ style: customStyle, text, isCenter }) {
  const isTablet = useDetectTablet();

  return (
    <RNText
      style={[
        styles.root,
        isTablet && styles.tablet,
        isCenter && styles.center,
        customStyle,
      ]}
    >
      {text}
    </RNText>
  );
}

const styles = StyleSheet.create({
  root: {
    fontFamily: 'LexendMega_400Regular',
    color: defaultStyles.colors.white,
    fontSize: 24,
  },
  tablet: {
    fontSize: 40,
  },
  center: {
    textAlign: 'center',
  },
});

Text.propTypes = {
  text: PropTypes.string,
  isCenter: PropTypes.bool,
};
