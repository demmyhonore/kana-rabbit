import React from "react";
import PropTypes from "prop-types";
import { Text, StyleSheet } from "react-native";

import defaultStyles from "../config/styles";

export default function Comment({ style, text }) {
  return <Text style={[styles.root, style]}>{text}</Text>;
}

const styles = StyleSheet.create({
  root: {
    fontFamily: "Lemon_400Regular",
    fontSize: 65,
    lineHeight: 75,
    textAlign: "center",
    color: defaultStyles.colors.white,
  },
});

Comment.propTypes = {
  text: PropTypes.string,
};
