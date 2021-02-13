import React from "react";
import { View, Text, TouchableHighlight, StyleSheet } from "react-native";

import defaultStyles from "../config/styles";

export default function Option({ onPress, children }) {
  return (
    <TouchableHighlight
      style={styles.root}
      onPress={onPress}
      underlayColor={defaultStyles.colors.chiffon}
    >
      <View style={styles.container}>{children}</View>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: defaultStyles.colors.paleOrange,
    height: 55,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: defaultStyles.spacing.s0,
  },
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "baseline",
  },
});
