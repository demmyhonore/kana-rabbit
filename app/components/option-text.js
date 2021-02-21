import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';

import defaultStyles from '../config/styles';
import Text from './text';

export default function OptionText({ style: customStyle, text }) {
  return <Text style={[styles.root, customStyle]} text={text} />;
}

const styles = StyleSheet.create({
  root: {
    color: defaultStyles.colors.blue,
    textTransform: 'lowercase',
  },
});

OptionText.propTypes = {
  text: PropTypes.string,
};
