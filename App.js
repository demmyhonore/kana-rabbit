import React from "react";
import AppLoading from "expo-app-loading";
import { useFonts, Lemon_400Regular } from "@expo-google-fonts/lemon";
import { LexendMega_400Regular } from "@expo-google-fonts/lexend-mega";
import { KosugiMaru_400Regular } from "@expo-google-fonts/kosugi-maru";

import { SettingsProvider } from "./app/context/settings";
import { KanaProvider } from "./app/context/kana";
import ChooseKanaOrderScreen from "./app/screens/choose-kana-order-screen";

export default function App() {
  const [fontsLoaded] = useFonts({
    Lemon_400Regular,
    LexendMega_400Regular,
    KosugiMaru_400Regular,
  });

  if (!fontsLoaded) return <AppLoading />;

  return (
    <SettingsProvider>
      <KanaProvider>
        <ChooseKanaOrderScreen />
      </KanaProvider>
    </SettingsProvider>
  );
}
