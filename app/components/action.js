import React from "react";
import PropTypes from "prop-types";
import { Text, TouchableHighlight, StyleSheet } from "react-native";

import defaultStyles from "../config/styles";

export default function Action({ style, text, onPress }) {
  return (
    <TouchableHighlight
      style={[styles.root, style]}
      onPress={onPress}
      underlayColor={defaultStyles.colors.green}
    >
      <Text style={styles.text}>{text}</Text>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: defaultStyles.colors.paleLimeGreen,
    height: 55,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontFamily: "LexendMega_400Regular",
    textTransform: "lowercase",
    color: defaultStyles.colors.blue,
    fontSize: 24,
  },
});

Action.propTypes = {
  text: PropTypes.string,
  onPress: PropTypes.func,
};
