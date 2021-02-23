import React from 'react';
import { render, fireEvent } from '../../../test-utils';
import defaultStyles from '../../config/styles';
import Action from '../action';

const testID = 'action';
const randomText = 'aa';

let mockIsTablet;
afterEach(() => {
  mockIsTablet = false;
});
jest.mock('../../hooks/use-detect-tablet', () => ({
  useDetectTablet: () => mockIsTablet,
}));

describe('<Action />', () => {
  it('renders text when passed as child', () => {
    const { getByText } = render(<Action text={randomText} />);

    expect(getByText(randomText)).toBeTruthy();
  });

  it('renders with default height and background color', () => {
    const { getByTestId } = render(<Action text={randomText} />);

    expect(getByTestId(testID)).toHaveStyle({
      height: 55,
      backgroundColor: defaultStyles.colors.paleLimeGreen,
    });
  });

  it('renders with increased height if tablet is detected', () => {
    mockIsTablet = true;
    const { getByTestId } = render(<Action text={randomText} />);

    expect(getByTestId(testID)).toHaveStyle({ height: 90 });
  });

  it('fires onPress callback when option is pressed', () => {
    const callback = jest.fn();
    const { getByText } = render(
      <Action text={randomText} onPress={callback} />
    );

    fireEvent.press(getByText(randomText));

    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('renders with different background color when isDisabled is passed as prop', () => {
    const { getByTestId } = render(<Action text={randomText} isDisabled />);

    expect(getByTestId(testID)).toHaveStyle({
      backgroundColor: defaultStyles.colors.lightGray,
    });
  });

  it('does not fire onPress callback when isDisabled is passed as prop', () => {
    const callback = jest.fn();
    render(<Action text={randomText} onPress={callback} isDisabled />);

    expect(callback).toHaveBeenCalledTimes(0);
  });
});
