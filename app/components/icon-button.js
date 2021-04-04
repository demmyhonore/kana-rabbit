import React from 'react';
import PropTypes from 'prop-types';
import { TouchableHighlight, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import defaultStyles from '../config/styles';
import { useDetectTablet } from '../hooks/use-detect-tablet';

export default function IconButton({
  style: customStyle,
  name,
  onPress,
  isSmall,
  ...rest
}) {
  const isTablet = useDetectTablet();

  return (
    <TouchableHighlight
      style={[styles.root, isTablet && styles.tablet, isSmall && styles.small, isSmall && isTablet && styles.smallTablet, customStyle]}
      onPress={onPress}
      underlayColor={defaultStyles.colors.chiffon}
    >
      <MaterialCommunityIcons
        testID='icon-button'
        name={name}
        size={isTablet ? 40 : 20}
        color={defaultStyles.colors.grayishViolet}
        {...rest}
      />
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: defaultStyles.colors.paleOrange,
    padding: defaultStyles.spacing['s-1'],
    borderRadius: 50,
  },
  tablet: {
    padding: defaultStyles.spacing.s0,
  },
  small: {

  },
});

IconButton.propTypes = {
  name: PropTypes.string,
  onPress: PropTypes.func,
};
