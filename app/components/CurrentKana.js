import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, View, Text } from "react-native";

import defaultStyles from "../config/styles";

export default function CurrentKana({ kana }) {
  /* Text wrapped in view for smooth keyboard transition. */
  return (
    <View>
      <Text style={[defaultStyles.kana, styles.kana]}>{kana.letter}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  kana: {
    fontSize: 200,
  },
});

CurrentKana.propTypes = {
  kana: PropTypes.object,
};
