import React, { useState } from "react";
import { View, StyleSheet } from "react-native";

import * as settingsEnum from "../enum/settings";
import defaultStyles from "../config/styles";

import Screen from "../components/screen";
import Comment from "../components/comment";
import Option from "../components/option";
import OptionText from "../components/option-text";
import KanaText from "../components/kana-text";
import Action from "../components/action";

export default function ChooseKanaScreen() {
  const [selectedId, setSelectedId] = useState(null);

  const renderOption = (text, value, kana) => (
    <Option onPress={() => setSelectedId(value)}>
      <OptionText style={styles.optionText} text={text} />
      <KanaText text={kana} />
    </Option>
  );

  return (
    <Screen style={styles.screen}>
      <Comment style={styles.comment} text="Which kana then..?" />
      <View style={styles.options}>
        {renderOption("Hiragana", settingsEnum.kanaType.HIRAGANA, "あ")}
        {renderOption("Katakana", settingsEnum.kanaType.KATAKANA, "ア")}
        {renderOption("With marks", settingsEnum.kanaType.WITH_MARKS, "が")}
        {renderOption("Combined", settingsEnum.kanaType.COMBINED, "きゃ")}
      </View>
      <Action style={styles.action} onPress={() => ""} text="Select" />
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: defaultStyles.colors.grayishViolet,
    padding: defaultStyles.spacing.s3,
  },
  comment: {
    marginTop: defaultStyles.spacing.s3,
    marginBottom: defaultStyles.spacing.s0,
  },
  options: {
    marginTop: "auto",
    marginBottom: "auto",
  },
  optionText: {
    marginRight: defaultStyles.spacing.s0,
  },
  action: {
    marginBottom: defaultStyles.spacing.s3,
  },
});
