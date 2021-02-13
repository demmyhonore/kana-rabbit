import React, { useState } from "react";
import { View, StyleSheet } from "react-native";

import * as settingsEnum from "../enum/settings";
import defaultStyles from "../config/styles";

import Screen from "../components/screen";
import Comment from "../components/comment";
import Option from "../components/option";
import OptionText from "../components/option-text";
import Action from "../components/action";

export default function ChooseKanaOrderScreen() {
  const [selectedId, setSelectedId] = useState(null);

  const renderOption = (text, value) => (
    <Option onPress={() => setSelectedId(value)}>
      <OptionText style={styles.optionText} text={text} />
    </Option>
  );

  return (
    <Screen style={styles.screen}>
      <Comment style={styles.comment} text="Pfff.. what order?" />
      <View style={styles.options}>
        {renderOption("Newbie", settingsEnum.kanaOrder.NEWBIE)}
        {renderOption("Random", settingsEnum.kanaOrder.RANDOM)}
      </View>
      <Action style={styles.action} onPress={() => ""} text="Start kana" />
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
