import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, View, KeyboardAvoidingView } from "react-native";

import Constants from "expo-constants";
import { StatusBar } from "expo-status-bar";

export default function Screen({
  children,
  style,
  statusBarStyle = "light",
  keyboardAvoiding,
}) {
  if (keyboardAvoiding) {
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={[styles.screen, style]}
      >
        {children}
        <StatusBar style={statusBarStyle} />
      </KeyboardAvoidingView>
    );
  }

  return (
    <View
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={[styles.screen, style]}
    >
      {children}
      <StatusBar style={statusBarStyle} />
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
  statusBarStyle: PropTypes.string,
  keyboardAvoiding: PropTypes.bool,
};
