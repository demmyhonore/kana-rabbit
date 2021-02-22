import React from 'react';
import { render, fireEvent } from '../../../test-utils';
import KanaInput from '../kana-input';

describe('<KanaInput />', () => {
  it('initially shows placeholder', () => {
    const { getByPlaceholderText } = render(<KanaInput />);

    expect(getByPlaceholderText('???')).toBeTruthy();
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
