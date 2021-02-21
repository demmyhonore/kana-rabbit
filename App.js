import React, { useState } from 'react';
import AppLoading from 'expo-app-loading';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as Font from 'expo-font';
import { useFonts, Lemon_400Regular } from '@expo-google-fonts/lemon';
import { LexendMega_400Regular } from '@expo-google-fonts/lexend-mega';
import { KosugiMaru_400Regular } from '@expo-google-fonts/kosugi-maru';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import * as routeEnum from './app/enum/route';
import { SettingsProvider } from './app/context/settings';
import { KanaProvider } from './app/context/kana';
import ChooseTypeScreen from './app/screens/choose-type-screen';
import ChooseOrderScreen from './app/screens/choose-order-screen';
import GuessKanaScreen from './app/screens/guess-kana-screen';

const cacheFonts = fonts => fonts.map(font => Font.loadAsync(font));

const Stack = createStackNavigator();

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
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={routeEnum.route.CHOOSE_TYPE}
          headerMode='false'
        >
          <Stack.Screen
            name={routeEnum.route.CHOOSE_TYPE}
            component={ChooseTypeScreen}
          />
          <Stack.Screen
            name={routeEnum.route.CHOOSE_ORDER}
            component={ChooseOrderScreen}
          />
          <Stack.Screen name={routeEnum.route.GUESS_KANA}>
            {props => (
              <KanaProvider>
                <GuessKanaScreen {...props} />
              </KanaProvider>
            )}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </SettingsProvider>
  );
}
