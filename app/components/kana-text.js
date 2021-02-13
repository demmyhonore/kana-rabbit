import React from "react";
import PropTypes from "prop-types";
import { Text, StyleSheet } from "react-native";

import defaultStyles from "../config/styles";

export default function KanaText({ style, text }) {
  return <Text style={[styles.root, style]}>{text}</Text>;
}

const styles = StyleSheet.create({
  root: {
    fontFamily: "KosugiMaru_400Regular",
    color: defaultStyles.colors.blue,
    fontSize: 24,
  },
});

KanaText.propTypes = {
  text: PropTypes.string,
};
