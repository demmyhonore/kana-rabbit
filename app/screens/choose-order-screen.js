import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';

import * as routeEnum from '../enum/route';
import * as settingsEnum from '../enum/settings';
import defaultStyles from '../config/styles';
import { useSettings } from '../context/settings';
import RegularScreen from '../components/regular-screen';
import Comment from '../components/comment';
import Option from '../components/option';
import OptionText from '../components/option-text';
import Action from '../components/action';

export default function ChooseOrderScreen({ navigation }) {
  const [, dispatch] = useSettings();
  const [selected, setSelected] = useState(settingsEnum.kanaOrder.NEWBIE);

  const handleActionPress = () => {
    dispatch({
      type: settingsEnum.actionTypes.SET_KANA_ORDER,
      payload: selected,
    });

    navigation.navigate(routeEnum.route.GUESS_KANA);
  };

  const renderOption = (text, value) => (
    <Option onPress={() => setSelected(value)} isSelected={selected === value}>
      <OptionText text={text} />
    </Option>
  );

  return (
    <RegularScreen>
      <Comment style={styles.comment} text='Pfff.. what order?' />
      <View style={styles.options}>
        {renderOption('Newbie', settingsEnum.kanaOrder.NEWBIE)}
        {renderOption('Random', settingsEnum.kanaOrder.RANDOM)}
      </View>
      <Action
        style={styles.action}
        onPress={handleActionPress}
        text='Start kana'
      />
    </RegularScreen>
  );
}

const styles = StyleSheet.create({
  comment: {
    textAlign: 'center',
  },
  options: {
    width: '100%',
  },
  action: {
    marginBottom: defaultStyles.spacing.s3,
  },
});
