import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';

import * as settingsEnum from '../enum/settings';
import * as routeEnum from '../enum/route';
import defaultStyles from '../config/styles';
import { useSettings } from '../context/settings';
import RegularScreen from '../components/regular-screen';
import Comment from '../components/comment';
import Character from '../components/character';
import Option from '../components/option';
import OptionText from '../components/option-text';
import Action from '../components/action';

export default function ChooseTypeScreen({ navigation }) {
  const [, dispatch] = useSettings();
  const [selected, setSelected] = useState({
    [settingsEnum.kanaType.HIRAGANA]: true,
    [settingsEnum.kanaType.KATAKANA]: false,
    [settingsEnum.kanaType.WITH_MARKS]: false,
    [settingsEnum.kanaType.COMBINED]: false,
  });
  const noSelection = !Object.values(selected).includes(true);

  const handleOptionPress = value =>
    selected[value]
      ? setSelected(prevSelected => ({ ...prevSelected, [value]: false }))
      : setSelected(prevSelected => ({ ...prevSelected, [value]: true }));

  const handleActionPress = () => {
    dispatch({
      type: settingsEnum.actionTypes.SET_KANA_TYPES,
      payload: selected,
    });
    navigation.navigate(routeEnum.route.CHOOSE_ORDER);
  };

  const renderOption = (text, value, kana) => (
    <Option
      onPress={() => handleOptionPress(value)}
      isSelected={selected[value]}
    >
      <OptionText text={text} style={styles.optionText} />
      <OptionText text={kana} />
    </Option>
  );

  return (
    <RegularScreen>
      <Comment style={styles.comment} text='Practice what kana?' />
      <Character />
      <View style={styles.options}>
        {renderOption('Hiragana', settingsEnum.kanaType.HIRAGANA, 'あ')}
        {renderOption('Katakana', settingsEnum.kanaType.KATAKANA, 'ア')}
        {renderOption('With marks', settingsEnum.kanaType.WITH_MARKS, 'が')}
        {renderOption('Combined', settingsEnum.kanaType.COMBINED, 'きゃ')}
      </View>
      <Action
        onPress={handleActionPress}
        text='Select'
        isDisabled={noSelection}
      />
    </RegularScreen>
  );
}

const styles = StyleSheet.create({
  comment: {
    textAlign: 'center',
  },
  options: {
    width: '90%',
  },
  optionText: {
    marginRight: defaultStyles.spacing.s0,
  },
});
