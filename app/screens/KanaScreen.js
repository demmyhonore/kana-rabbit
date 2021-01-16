import React, { useState } from "react";
import { StyleSheet } from "react-native";

import Screen from "../components/Screen";
import KanaBig from "../components/KanaBig";
import KanaInput from "../components/KanaInput";

export default function KanaScreen() {
  const [kanaInputValue, setKanaInputValue] = useState("");

  return (
    <Screen style={styles.screen} avoidKeyboard>
      <KanaBig kana={{ hiragana: "お" }} />
      <KanaInput
        value={kanaInputValue}
        onChange={setKanaInputValue}
        placeholder="Type your kana"
        maxLength={4}
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
});
