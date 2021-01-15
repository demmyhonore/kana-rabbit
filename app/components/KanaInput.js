import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, TextInput } from "react-native";

import defaultStyles from "../config/styles";

export default function KanaInput({ value, onChange, placeholder }) {
  return (
    <TextInput
      style={styles.input}
      maxLength={4}
      value={value}
      placeholder={placeholder}
      onChangeText={onChange}
      autoCorrect={false}
      autoCapitalize="none"
      textContentType="none"
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
};
