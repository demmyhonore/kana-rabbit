import React, { useState } from "react";
import { View, StyleSheet } from "react-native";

import * as settingsEnum from "../enum/settings";
import defaultStyles from "../config/styles";
import { useSettings } from "../context/settings";
import { useDetectTablet } from "../hooks/use-detect-tablet";

import Screen from "../components/screen";
import Comment from "../components/comment";
import Option from "../components/option";
import Text from "../components/text";
import Action from "../components/action";

export default function ChooseKanaOrderScreen() {
  const isTablet = useDetectTablet();
  const [, dispatch] = useSettings();

  const [selected, setSelected] = useState(settingsEnum.kanaOrder.NEWBIE);

  const renderOption = (text, value) => (
    <Option onPress={() => setSelected(value)} isSelected={selected === value}>
      <Text style={styles.optionText} text={text} />
    </Option>
  );

  return (
    <Screen style={styles.screen}>
      <View style={[isTablet ? styles.tablet : styles.normal]}>
        <Comment containerStyle={styles.comment} text="Pfff.. what order?" />
        <View>
          {renderOption("Newbie", settingsEnum.kanaOrder.NEWBIE)}
          {renderOption("Random", settingsEnum.kanaOrder.RANDOM)}
        </View>
        <Action
          style={styles.action}
          onPress={() =>
            dispatch({
              type: settingsEnum.actionTypes.SET_KANA_ORDER,
              payload: selected,
            })
          }
          text="Start kana"
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: defaultStyles.colors.grayishViolet,
    padding: defaultStyles.spacing.s3,
    justifyContent: "space-around",
  },
  normal: {
    flex: 1,
    justifyContent: "space-around",
  },
  tablet: {
    flex: 1,
    width: "70%",
    marginLeft: "auto",
    marginRight: "auto",
    justifyContent: "space-around",
  },
  comment: {
    marginTop: defaultStyles.spacing.s3,
    marginBottom: defaultStyles.spacing.s0,
  },
  optionText: {
    color: defaultStyles.colors.blue,
    textTransform: "lowercase",
    marginRight: defaultStyles.spacing.s0,
  },
  action: {
    marginBottom: defaultStyles.spacing.s3,
  },
});
