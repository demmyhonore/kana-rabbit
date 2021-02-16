import React from "react";
import PropTypes from "prop-types";
import { View, TouchableHighlight, StyleSheet } from "react-native";

import defaultStyles from "../config/styles";

export default function Option({ onPress, children, isSelected }) {
  return (
    <TouchableHighlight
      style={[styles.root, isSelected ? styles.selected : null]}
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
  selected: {
    backgroundColor: defaultStyles.colors.chiffon,
  },
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "baseline",
  },
});

Option.propTypes = {
  onPress: PropTypes.func,
  isSelected: PropTypes.bool,
};
