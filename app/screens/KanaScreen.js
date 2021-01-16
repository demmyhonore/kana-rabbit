import React, { useState } from "react";
import { StyleSheet } from "react-native";

import answerStatus from "../enum/answerStatus";
import Screen from "../components/Screen";
import KanaBig from "../components/KanaBig";
import KanaInput from "../components/KanaInput";

const kanaArray = [
  { symbol: "お", type: "hiragana", sound: "a" },
  { symbol: "か", type: "hiragana", sound: "ka" },
  { symbol: "さ", type: "hiragana", sound: "sa" },
];

export default function KanaScreen() {
  const [{ status, kana }, setState] = useState({
    status: answerStatus.PENDING,
    kana: kanaArray[0],
  });

  const [inputValue, setInputValue] = useState("");

  return (
    <Screen style={styles.screen} avoidKeyboard>
      <KanaBig kana={kana} />
      <KanaInput
        value={inputValue}
        onChange={setInputValue}
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
