import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';

import { useDetectTablet } from '../hooks/use-detect-tablet';

export default function Character({ isSmall, style: customStyle }) {
  const isTablet = useDetectTablet();

  return (
    <View
      style={[
        styles.root,
        isTablet && styles.tablet,
        isSmall && styles.small,
        isSmall && isTablet && styles.smallTablet,
        customStyle,
      ]}
    />
  );
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: 'white',
    borderRadius: 50,
    height: 100,
    width: 100,
  },
  tablet: {
    borderRadius: 100,
    height: 200,
    width: 200,
  },
  small: {
    borderRadius: 25,
    height: 50,
    width: 50,
  },
  smallTablet: {
    borderRadius: 50,
    height: 100,
    width: 100,
  },
});

Character.propTypes = {
  isSmall: PropTypes.bool,
};
