import React from 'react';
import { render, fireEvent } from '../../../test-utils';
import KanaInput from '../kana-input';

let mockIsTablet;
afterEach(() => {
  mockIsTablet = false;
});
jest.mock('../../hooks/use-detect-tablet', () => ({
  useDetectTablet: () => mockIsTablet,
}));

describe('<KanaInput />', () => {
  it('initially shows placeholder and default font size', () => {
    const { getByPlaceholderText } = render(<KanaInput />);

    expect(getByPlaceholderText('???')).toBeTruthy();
    expect(getByPlaceholderText('???')).toHaveStyle({ fontSize: 24 });
  });

  it('shows bigger font size if tablet is detected', () => {
    mockIsTablet = true;
    const { getByPlaceholderText } = render(<KanaInput />);

    expect(getByPlaceholderText('???')).toHaveStyle({ fontSize: 40 });
  });

  it('displays as value what is passed by answer prop', () => {
    const { getByDisplayValue } = render(<KanaInput answer='aa' />);

    expect(getByDisplayValue('aa')).toBeTruthy();
  });

  it('fires callback if text is added to input', () => {
    const callback = jest.fn();
    const { getByTestId } = render(<KanaInput onAnswerChange={callback} />);
    const kanaInput = getByTestId('kana-input');

    fireEvent.changeText(kanaInput, 'a');

    expect(callback).toBeCalledWith('a');
  });
});
