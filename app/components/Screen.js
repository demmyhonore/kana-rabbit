import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, Platform, View, KeyboardAvoidingView } from "react-native";

import Constants from "expo-constants";
import { StatusBar } from "expo-status-bar";

export default function Screen({
  style: customStyle,
  avoidKeyboard,
  children,
}) {
  if (avoidKeyboard) {
    return (
      <KeyboardAvoidingView
        testID="keyboard-avoiding-view"
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={[styles.screen, customStyle]}
      >
        <StatusBar translucent />
        {children}
      </KeyboardAvoidingView>
    );
  }

  return (
    <View testID="regular-view" style={[styles.screen, customStyle]}>
      <StatusBar translucent />
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
  },
});

Screen.propTypes = {
  avoidKeyboard: PropTypes.bool,
};
