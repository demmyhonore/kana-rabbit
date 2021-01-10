import React from "react";
import { StyleSheet, Platform, StatusBar, SafeAreaView } from "react-native";
import {
  useFonts,
  NotoSansJP_500Medium,
} from "@expo-google-fonts/noto-sans-jp";
import AppLoading from "expo-app-loading";

import colors from "./app/config/colors";
import KanaScreen from "./app/screens/KanaScreen";

export default function App() {
  let [fontsLoaded] = useFonts({
    NotoSansJP_500Medium,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <KanaScreen />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
