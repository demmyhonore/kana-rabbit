import React from "react";
import PropTypes from "prop-types";
import { TouchableHighlight, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import defaultStyles from "../config/styles";

export default function IconButton({ style, size = 20, name, onPress }) {
  return (
    <TouchableHighlight
      style={[styles.root, style]}
      onPress={onPress}
      underlayColor={defaultStyles.colors.chiffon}
    >
      <MaterialCommunityIcons
        name={name}
        size={size}
        color={defaultStyles.colors.grayishViolet}
      />
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: defaultStyles.colors.paleOrange,
    padding: defaultStyles.spacing["s-1"],
    borderRadius: 50,
  },
});

IconButton.propTypes = {
  size: PropTypes.number,
  name: PropTypes.string,
  onPress: PropTypes.func,
};
