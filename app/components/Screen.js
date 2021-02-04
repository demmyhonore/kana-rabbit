import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, Platform, View, KeyboardAvoidingView } from "react-native";

import Constants from "expo-constants";
import { StatusBar } from "expo-status-bar";

export default function Screen({ children, style, avoidKeyboard }) {
  if (avoidKeyboard) {
    return (
      <KeyboardAvoidingView
        testID="keyboard-avoiding-view"
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={[styles.screen, style]}
      >
        {children}
        <StatusBar translucent={true} />
      </KeyboardAvoidingView>
    );
  }

  return (
    <View testID="regular-view" style={[styles.screen, style]}>
      {children}
      <StatusBar translucent={true} />
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
  style: PropTypes.object,
  avoidKeyboard: PropTypes.bool,
};
