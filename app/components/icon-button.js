import React from 'react';
import PropTypes from 'prop-types';
import { TouchableHighlight, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import defaultStyles from '../config/styles';
import { useDetectTablet } from '../hooks/use-detect-tablet';

export default function IconButton({ style: customStyle, name, onPress }) {
  const isTablet = useDetectTablet();

  return (
    <TouchableHighlight
      style={[styles.root, isTablet && styles.rootTablet, customStyle]}
      onPress={onPress}
      underlayColor={defaultStyles.colors.chiffon}
    >
      <MaterialCommunityIcons
        name={name}
        size={isTablet ? 45 : 30}
        color={defaultStyles.colors.white}
      />
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: defaultStyles.colors.paleOrange,
    padding: defaultStyles.spacing.['s-1'],
    borderRadius: 50,
  },
  rootTablet: {
    padding: defaultStyles.spacing.s1,
  },
});

IconButton.propTypes = {
  name: PropTypes.string,
  onPress: PropTypes.func,
};
