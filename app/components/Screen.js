import React from "react";
import { StyleSheet, KeyboardAvoidingView } from "react-native";

import Constants from "expo-constants";
import { StatusBar } from "expo-status-bar";

export default function Screen({ children, style, statusBarStyle = "light" }) {
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

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
  },
});
