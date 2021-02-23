import React from 'react';
import { render, fireEvent } from '../../../../test-utils';
import EndScreen from '../end-screen';

const imageTestID = 'image';
const emailIconTestID = 'email-icon';
const restartIconTestID = 'restart-icon';

let mockIsTablet;
afterEach(() => {
  mockIsTablet = false;
});
jest.mock('../../../hooks/use-detect-tablet', () => ({
  useDetectTablet: () => mockIsTablet,
}));

describe('<EndScreen />', () => {
  it('renders end screen with default image size', () => {
    const { getByText, getByTestId } = render(<EndScreen />);

    expect(getByText(/in the snow/i)).toBeTruthy();
    expect(getByTestId(imageTestID)).toHaveStyle({ width: 270 });
  });

  it('renders bigger image size if tablet is detected', () => {
    mockIsTablet = true;
    const { getByTestId } = render(<EndScreen />);

    expect(getByTestId(imageTestID)).toHaveStyle({ width: 405 });
  });

  it('fires onMailPress and onRestartPress when buttons are pressed', () => {
    const callback = jest.fn();
    const { getByTestId } = render(
      <EndScreen onMailPress={callback} onRestartPress={callback} />
    );

    fireEvent.press(getByTestId(emailIconTestID));
    fireEvent.press(getByTestId(restartIconTestID));

    expect(callback).toHaveBeenCalledTimes(2);
  });
});
