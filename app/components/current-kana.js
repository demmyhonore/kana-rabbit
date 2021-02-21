import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';

import defaultStyles from '../config/styles';
import { useDetectTablet } from '../hooks/use-detect-tablet';
import KanaText from './kana-text';

export default function CurrentKana({ kana, isCombined }) {
  const isTablet = useDetectTablet();

  return (
    <KanaText
      style={[
        styles.root,
        isCombined && styles.combined,
        isTablet && styles.tablet,
        isCombined && isTablet && styles.combinedTablet,
      ]}
      kana={kana}
    />
  );
}

const styles = StyleSheet.create({
  root: {
    fontSize: 180,
    textAlign: 'center',
    color: defaultStyles.colors.white,
  },
  combined: {
    fontSize: 120,
  },
  tablet: {
    fontSize: 300,
  },
  combinedTablet: {
    fontSize: 200,
  },
});

CurrentKana.propTypes = {
  kana: PropTypes.string,
  isCombined: PropTypes.bool,
};
