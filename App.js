import React, { useState } from 'react';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';
import { useFonts, Lemon_400Regular } from '@expo-google-fonts/lemon';
import { LexendMega_400Regular } from '@expo-google-fonts/lexend-mega';
import { KosugiMaru_400Regular } from '@expo-google-fonts/kosugi-maru';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { SettingsProvider } from './app/context/settings';
import { KanaProvider } from './app/context/kana';
// import ChooseType from './app/screens/choose-type-screen';
// import ChooseOrder from './app/screens/choose-order-screen';
import GuessKanaScreen from './app/screens/guess-kana-screen';

const cacheFonts = fonts => fonts.map(font => Font.loadAsync(font));

export default function App() {
  const [iconsLoaded, setIconsLoaded] = useState(false);
  const [fontsLoaded] = useFonts({
    Lemon_400Regular,
    LexendMega_400Regular,
    KosugiMaru_400Regular,
  });

  const loadAssetsAsync = async () => {
    const fontAssets = cacheFonts([MaterialCommunityIcons.font]);

    await Promise.all([...fontAssets]);
  };

  if (!fontsLoaded || !iconsLoaded)
    return (
      <AppLoading
        startAsync={loadAssetsAsync}
        onFinish={() => setIconsLoaded(true)}
        onError={console.warn}
      />
    );

  return (
    <SettingsProvider>
      <KanaProvider>
        {/* <ChooseType /> */}
        {/* <ChooseOrder /> */}
        <GuessKanaScreen />
      </KanaProvider>
    </SettingsProvider>
  );
}
