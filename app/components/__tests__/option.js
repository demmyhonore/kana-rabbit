import React from 'react';
import { render, fireEvent } from '../../../test-utils';
import defaultStyles from '../../config/styles';
import Option from '../option';
import OptionText from '../option-text';

const testID = 'option';
const randomText = 'aa';

let mockIsTablet;
afterEach(() => {
  mockIsTablet = false;
});
jest.mock('../../hooks/use-detect-tablet', () => ({
  useDetectTablet: () => mockIsTablet,
}));

describe('<Option />', () => {
  it('renders option text when passed as child', () => {
    const { getByText } = render(
      <Option>
        <OptionText text={randomText} />
      </Option>
    );

    expect(getByText(randomText)).toBeTruthy();
  });

  it('renders with default height and background color', () => {
    const { getByTestId } = render(
      <Option>
        <OptionText text={randomText} />
      </Option>
    );

    expect(getByTestId(testID)).toHaveStyle({
      height: 55,
      backgroundColor: defaultStyles.colors.paleOrange,
    });
  });

  it('renders with increased height if tablet is detected', () => {
    mockIsTablet = true;
    const { getByTestId } = render(
      <Option>
        <OptionText text={randomText} />
      </Option>
    );

    expect(getByTestId(testID)).toHaveStyle({ height: 90 });
  });

  it('renders with different background color when isSelected is passed as prop', () => {
    const { getByTestId } = render(
      <Option isSelected>
        <OptionText text={randomText} />
      </Option>
    );

    expect(getByTestId(testID)).toHaveStyle({
      backgroundColor: defaultStyles.colors.chiffon,
    });
  });

  it('fires onPress callback when option is pressed', () => {
    const callback = jest.fn();
    const { getByText } = render(
      <Option onPress={callback}>
        <OptionText text={randomText} />
      </Option>
    );

    fireEvent.press(getByText(randomText));

    expect(callback).toHaveBeenCalledTimes(1);
  });
});
