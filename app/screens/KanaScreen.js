import React from "react";
import { StyleSheet, View, Text } from "react-native";

import Screen from "../components/Screen";
import KanaInput from "../components/KanaInput";

import defaultStyles from "../config/styles";

export default function KanaScreen() {
  const [kanaValue, onChangeKanaValue] = React.useState("");

  return (
    <Screen style={styles.screen} keyboardAvoiding>
      <View>
        <Text style={[defaultStyles.kana, styles.kana]}>お</Text>
      </View>
      <KanaInput
        value={kanaValue}
        onChange={onChangeKanaValue}
        placeholder="Type your kana"
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
  },
  kana: {
    fontSize: 200,
  },
});
