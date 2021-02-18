import React from "react";
import PropTypes from "prop-types";
import { TouchableHighlight, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import defaultStyles from "../config/styles";
import { useDetectTablet } from "../hooks/use-detect-tablet";

export default function IconButton({ style, name, onPress }) {
  const isTablet = useDetectTablet();

  return (
    <TouchableHighlight
      style={[styles.root, style]}
      onPress={onPress}
      underlayColor={defaultStyles.colors.chiffon}
    >
      <MaterialCommunityIcons
        name={name}
        size={isTablet ? 40 : 26}
        color={defaultStyles.colors.grayishViolet}
      />
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: defaultStyles.colors.paleOrange,
    padding: defaultStyles.spacing["s-2"],
    borderRadius: 50,
  },
});

IconButton.propTypes = {
  name: PropTypes.string,
  onPress: PropTypes.func,
};
