import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, TextInput } from "react-native";

import defaultStyles from "../config/styles";

export default function KanaInput({ value, onChange, placeholder, maxLength }) {
  return (
    <TextInput
      style={styles.input}
      onChangeText={onChange}
      value={value}
      placeholder={placeholder}
      maxLength={maxLength}
      autoCorrect={false}
      autoCapitalize="none"
      textContentType="none"
      testID="kana-input"
      autoFocus
    />
  );
}

const styles = StyleSheet.create({
  input: {
    borderBottomWidth: 1,
    borderBottomColor: defaultStyles.colors.black,
  },
});

KanaInput.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  maxLength: PropTypes.number,
};
