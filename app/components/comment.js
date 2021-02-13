import React from "react";
import PropTypes from "prop-types";
import { Text, StyleSheet } from "react-native";

import defaultStyles from "../config/styles";

export default function Comment({ containerStyle, textStyle, text, answer }) {
  return (
    <Text style={containerStyle}>
      <Text style={[styles.root, textStyle]}>{text}</Text>
      {answer ? <Text style={[styles.answer, textStyle]}>{answer}</Text> : null}
    </Text>
  );
}

const styles = StyleSheet.create({
  root: {
    fontFamily: "Lemon_400Regular",
    fontSize: 65,
    lineHeight: 75,
    textAlign: "center",
    color: defaultStyles.colors.white,
  },
  answer: {
    fontFamily: "Lemon_400Regular",
    fontSize: 65,
    lineHeight: 75,
    textAlign: "center",
    color: defaultStyles.colors.paleLimeGreen,
    textDecorationLine: "underline",
  },
});

Comment.propTypes = {
  text: PropTypes.string,
  answer: PropTypes.string,
};
