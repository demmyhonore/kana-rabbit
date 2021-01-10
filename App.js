import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import {
  useFonts,
  NotoSansJP_500Medium,
} from "@expo-google-fonts/noto-sans-jp";

export default function App() {
  let [fontsLoaded] = useFonts({
    NotoSansJP_500Medium,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={{ fontFamily: "NotoSansJP_500Medium", fontSize: 200 }}>
        お
      </Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
