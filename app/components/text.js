import React from "react";
import PropTypes from "prop-types";
import { Text, StyleSheet } from "react-native";

import defaultStyles from "../config/styles";
import { useDetectTablet } from "../hooks/use-detect-tablet";

export default function OptionText({ style, text }) {
  const isTablet = useDetectTablet();

  return (
    <Text style={[styles.root, isTablet && styles.tablet, style]}>
      {text}
    </Text>
  );
}

const styles = StyleSheet.create({
  root: {
    fontFamily: "LexendMega_400Regular",
    color: defaultStyles.colors.white,
    fontSize: 24,
  },
  tablet: {
    fontSize: 40,
  },
});

OptionText.propTypes = {
  text: PropTypes.string,
};
