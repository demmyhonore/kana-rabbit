import React from 'react';
import { render } from '../../../test-utils';
import KeyboardScreen from '../keyboard-screen';

const testID = 'keyboard-screen-container';

let mockIsTablet;
afterEach(() => {
  mockIsTablet = false;
});
jest.mock('../../hooks/use-detect-tablet', () => ({
  useDetectTablet: () => mockIsTablet,
}));

describe('<KeyboardScreen />', () => {
  it('applies the custom style that is passed as prop', () => {
    const randomStyle = { color: 'red' };
    const { queryByTestId } = render(<KeyboardScreen style={randomStyle} />);

    expect(queryByTestId(testID)).toHaveStyle(randomStyle);
  });

  it('applies a max width of 85% if tablet is detected', () => {
    mockIsTablet = true;
    const { queryByTestId } = render(<KeyboardScreen />);

    expect(queryByTestId(testID)).toHaveStyle({ width: '85%' });
  });
});
