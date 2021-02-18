import React from "react";
import PropTypes from "prop-types";
import { Text, StyleSheet } from "react-native";

import defaultStyles from "../config/styles";
import { useDetectTablet } from "../hooks/use-detect-tablet";

export default function KanaText({ style, text }) {
  const isTablet = useDetectTablet();

  return (
    <Text
      style={[styles.root, isTablet && styles.tablet, style]}
      numberOfLines={1}
    >
      {text}
    </Text>
  );
}

const styles = StyleSheet.create({
  root: {
    fontFamily: "KosugiMaru_400Regular",
    color: defaultStyles.colors.blue,
    fontSize: 24,
  },
  tablet: {
    fontSize: 40,
  },
});

KanaText.propTypes = {
  text: PropTypes.string,
};
