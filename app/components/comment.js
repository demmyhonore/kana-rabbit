import React from "react";
import PropTypes from "prop-types";
import { Text, StyleSheet } from "react-native";

import defaultStyles from "../config/styles";
import { useDetectTablet } from "../hooks/use-detect-tablet";

export default function Comment({ containerStyle, textStyle, text, answer }) {
  const isTablet = useDetectTablet();

  return (
    <Text style={[styles.root, isTablet && styles.tablet, containerStyle]}>
      <Text style={textStyle}>{text}</Text>
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
  tablet: {
    fontSize: 100,
    lineHeight: 120,
  },
  answer: {
    color: defaultStyles.colors.paleLimeGreen,
    textDecorationLine: "underline",
  },
});

Comment.propTypes = {
  text: PropTypes.string,
  answer: PropTypes.string,
};
