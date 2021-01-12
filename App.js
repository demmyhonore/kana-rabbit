import React from "react";
import AppLoading from "expo-app-loading";
import {
  useFonts,
  NotoSansJP_500Medium,
} from "@expo-google-fonts/noto-sans-jp";

import KanaScreen from "./app/screens/KanaScreen";

export default function App() {
  const [fontsLoaded] = useFonts({
    NotoSansJP_500Medium,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return <KanaScreen />;
}
