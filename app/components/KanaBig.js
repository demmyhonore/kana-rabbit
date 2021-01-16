import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, View, Text } from "react-native";

import defaultStyles from "../config/styles";

export default function KanaBig({ kana }) {
  // Wrapped in view for fluid avoid keyboard transition bug
  return (
    <View>
      <Text style={[defaultStyles.kana, styles.kana]}>{kana.hiragana}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  kana: {
    fontSize: 200,
  },
});

KanaBig.propTypes = {
  kana: PropTypes.object,
};
