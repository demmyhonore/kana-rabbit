import React from 'react';
import { render, fireEvent } from '../../../test-utils';
import IconButton from '../icon-button';

const testID = 'icon-button';
const randomIconName = 'restart';

let mockIsTablet;
afterEach(() => {
  mockIsTablet = false;
});
jest.mock('../../hooks/use-detect-tablet', () => ({
  useDetectTablet: () => mockIsTablet,
}));

describe('<IconButton />', () => {
  it('renders icon with default size when name is passed as prop', () => {
    const { getByTestId } = render(<IconButton name={randomIconName} />);

    expect(getByTestId(testID)).toBeTruthy();
    expect(getByTestId(testID)).toHaveProp('size', 30);
  });

  it('renders icon with bigger size if tablet is detected', () => {
    mockIsTablet = true;
    const { getByTestId } = render(<IconButton name={randomIconName} />);

    expect(getByTestId(testID)).toHaveProp('size', 45);
  });

  it('fires onPress callback when option is pressed', () => {
    const callback = jest.fn();
    const { getByTestId } = render(
      <IconButton name={randomIconName} onPress={callback} />
    );

    fireEvent.press(getByTestId(testID));

    expect(callback).toHaveBeenCalledTimes(1);
  });
});
