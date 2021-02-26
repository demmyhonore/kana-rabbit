import React from 'react';
import { render, fireEvent } from '../../../test-utils';
import * as routeEnum from '../../enum/route';
import defaultStyles from '../../config/styles';
import ChooseOrderScreen from '../choose-order-screen';

const optionTestID = 'option';
const actionTestID = 'action';

describe('<ChooseOrderScreen />', () => {
  it('has the newbie option initially selected', () => {
    const { queryAllByTestId } = render(<ChooseOrderScreen />);
    const newbieOption = queryAllByTestId(optionTestID)[0];
    const randomOption = queryAllByTestId(optionTestID)[1];

    expect(newbieOption).toHaveStyle({
      backgroundColor: defaultStyles.colors.chiffon,
    });
    expect(randomOption).toHaveStyle({
      backgroundColor: defaultStyles.colors.paleOrange,
    });
  });

  it('keeps the newbie selection when pressed', () => {
    const { queryAllByTestId } = render(<ChooseOrderScreen />);
    const newbieOption = queryAllByTestId(optionTestID)[0];

    fireEvent.press(newbieOption);

    expect(newbieOption).toHaveStyle({
      backgroundColor: defaultStyles.colors.chiffon,
    });
  });

  it('toggles the random selection when pressed', () => {
    const { queryAllByTestId } = render(<ChooseOrderScreen />);
    const newbieOption = queryAllByTestId(optionTestID)[0];
    const randomOption = queryAllByTestId(optionTestID)[1];

    fireEvent.press(randomOption);

    expect(newbieOption).toHaveStyle({
      backgroundColor: defaultStyles.colors.paleOrange,
    });
    expect(randomOption).toHaveStyle({
      backgroundColor: defaultStyles.colors.chiffon,
    });
  });

  it('calls the guess kana route when the select button is pressed', () => {
    const navigate = jest.fn();
    const { getByTestId } = render(
      <ChooseOrderScreen navigation={{ navigate }} />
    );
    const selectAction = getByTestId(actionTestID);

    fireEvent.press(selectAction);

    expect(navigate).toHaveBeenCalledWith(routeEnum.route.GUESS_KANA);
  });
});
