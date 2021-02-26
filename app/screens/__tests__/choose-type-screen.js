import React from 'react';
import { render, fireEvent } from '../../../test-utils';
import * as routeEnum from '../../enum/route';
import defaultStyles from '../../config/styles';
import ChooseTypeScreen from '../choose-type-screen';

const optionTestID = 'option';
const actionTestID = 'action';

describe('<ChooseTypeScreen />', () => {
  it('has the hiragana option initially selected', () => {
    const { queryAllByTestId } = render(<ChooseTypeScreen />);
    const hiraganaOption = queryAllByTestId(optionTestID)[0];
    const katakanaOption = queryAllByTestId(optionTestID)[1];

    expect(hiraganaOption).toHaveStyle({
      backgroundColor: defaultStyles.colors.chiffon,
    });
    expect(katakanaOption).toHaveStyle({
      backgroundColor: defaultStyles.colors.paleOrange,
    });
  });

  it('removes the hiragana selection when pressed', () => {
    const { queryAllByTestId } = render(<ChooseTypeScreen />);
    const hiraganaOption = queryAllByTestId(optionTestID)[0];

    fireEvent.press(hiraganaOption);

    expect(hiraganaOption).toHaveStyle({
      backgroundColor: defaultStyles.colors.paleOrange,
    });
  });

  it('adds the katakana selection when pressed', () => {
    const { queryAllByTestId } = render(<ChooseTypeScreen />);
    const katakanaOption = queryAllByTestId(optionTestID)[1];

    fireEvent.press(katakanaOption);

    expect(katakanaOption).toHaveStyle({
      backgroundColor: defaultStyles.colors.chiffon,
    });
  });

  it('disables the select button when no type is selected', () => {
    const navigate = jest.fn();
    const { queryAllByTestId, getByTestId } = render(
      <ChooseTypeScreen navigation={{ navigate }} />
    );
    const hiraganaOption = queryAllByTestId(optionTestID)[0];
    const selectAction = getByTestId(actionTestID);

    fireEvent.press(hiraganaOption);
    fireEvent.press(selectAction);

    expect(selectAction).toHaveStyle({
      backgroundColor: defaultStyles.colors.lightGray,
    });
  });

  it('calls the choose order route when the select button is pressed', () => {
    const navigate = jest.fn();
    const { getByTestId } = render(
      <ChooseTypeScreen navigation={{ navigate }} />
    );
    const selectAction = getByTestId(actionTestID);

    fireEvent.press(selectAction);

    expect(navigate).toHaveBeenCalledWith(routeEnum.route.CHOOSE_ORDER);
  });
});
