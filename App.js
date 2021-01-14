import React from "react";

import AppLoading from "expo-app-loading";
import {
  useFonts,
  KosugiMaru_400Regular,
} from "@expo-google-fonts/kosugi-maru";

import KanaScreen from "./app/screens/KanaScreen";

export default function App() {
  const [fontsLoaded] = useFonts({ KosugiMaru_400Regular });

  if (!fontsLoaded) return <AppLoading />;

  return <KanaScreen />;
}
