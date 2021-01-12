import React from "react";
import { StyleSheet, Text } from "react-native";
import { StatusBar } from "expo-status-bar";

import colors from "../config/colors";
import Screen from "../components/Screen";

export default function KanaScreen() {
  return (
    <Screen style={styles.root}>
      <Text style={styles.kana}>お</Text>
      <StatusBar style="light" />
    </Screen>
  );
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: colors.white,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  kana: {
    fontFamily: "NotoSansJP_500Medium",
    fontSize: 200,
  },
});
