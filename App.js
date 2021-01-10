import React from "react";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Platform,
  Text,
  StatusBar,
  SafeAreaView,
} from "react-native";
import AppLoading from "expo-app-loading";
import {
  useFonts,
  NotoSansJP_500Medium,
} from "@expo-google-fonts/noto-sans-jp";

export default function App() {
  let [fontsLoaded] = useFonts({
    NotoSansJP_500Medium,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={{ fontFamily: "NotoSansJP_500Medium", fontSize: 200 }}>
        お
      </Text>
      <ExpoStatusBar style="light" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
