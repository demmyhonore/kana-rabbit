import React from "react";
import { StyleSheet, TextInput } from "react-native";

import colors from "../config/colors";

export default function KanaInput({ value, onChange }) {
  return (
    <TextInput
      style={styles.input}
      maxLength={4}
      value={value}
      placeholder="Type your kana"
      onChangeText={onChange}
      autoCorrect={false}
      textContentType="none"
      autoFocus
    />
  );
}

const styles = StyleSheet.create({
  input: {
    borderBottomWidth: 1,
    borderBottomColor: colors.black,
  },
});
