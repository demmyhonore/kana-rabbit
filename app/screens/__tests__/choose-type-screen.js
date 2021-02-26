import React from 'react';
import { render, fireEvent } from '../../../test-utils';
import * as routeEnum from '../../enum/route';
import defaultStyles from '../../config/styles';
import ChooseTypeScreen from '../choose-type-screen';

const optionTestID = 'option';
const actionTestID = 'action';

describe('<ChooseTypeScreen />', () => {
  it('initially renders the hiragana option selected', () => {
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

  it('disables the select action when no type is selected', () => {
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

  it('calls the correct route when the select action is pressed', () => {
    const navigate = jest.fn();
    const { getByTestId } = render(
      <ChooseTypeScreen navigation={{ navigate }} />
    );
    const selectAction = getByTestId(actionTestID);

    fireEvent.press(selectAction);

    expect(navigate).toHaveBeenCalledWith(routeEnum.route.CHOOSE_ORDER);
  });
});
