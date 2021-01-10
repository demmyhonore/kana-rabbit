import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { StatusBar } from "expo-status-bar";

export default function KanaScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.kana}>お</Text>
      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  kana: {
    fontFamily: "NotoSansJP_500Medium",
    fontSize: 200,
  },
});
