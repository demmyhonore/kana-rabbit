import React from 'react';
import { StyleSheet, View } from 'react-native';
import Constants from 'expo-constants';
import { StatusBar } from 'expo-status-bar';

import defaultStyles from '../config/styles';
import { useDetectTablet } from '../hooks/use-detect-tablet';

export default function RegularScreen({ style: customStyle, children }) {
  const isTablet = useDetectTablet();

  return (
    <View style={styles.root}>
      <StatusBar translucent />
      <View testID='regular-screen-container' style={[styles.container, isTablet && styles.tablet, customStyle]}>
        {children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: defaultStyles.colors.grayishViolet,
    paddingTop: Constants.statusBarHeight,
  },
  container: {
    flex: 1,
    padding: defaultStyles.spacing.s3,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  tablet: {
    width: '70%',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
});
