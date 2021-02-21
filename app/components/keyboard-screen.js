import React from 'react';
import { StyleSheet, Platform, KeyboardAvoidingView, View } from 'react-native';
import Constants from 'expo-constants';
import { StatusBar } from 'expo-status-bar';

import defaultStyles from '../config/styles';
import { useDetectTablet } from '../hooks/use-detect-tablet';

export default function KeyboardScreen({ style: customStyle, children }) {
  const isTablet = useDetectTablet();

  return (
    <KeyboardAvoidingView
      testID='keyboard-screen'
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.root}
    >
      <StatusBar translucent />
      <View style={[styles.container, isTablet && styles.tablet, customStyle]}>
        {children}
      </View>
    </KeyboardAvoidingView>
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
    padding: defaultStyles.spacing.s2,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  tablet: {
    width: '85%',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
});
