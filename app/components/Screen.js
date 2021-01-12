import React from "react";
import Constants from "expo-constants";
import { SafeAreaView, StyleSheet } from "react-native";

export default function Screen({ children, style }) {
  return <SafeAreaView style={[styles.root, style]}>{children}</SafeAreaView>;
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
  },
});
