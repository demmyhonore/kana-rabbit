import React from 'react';
import { render, fireEvent, waitFor } from '../../../test-utils';
import GuessKanaScreen from '../guess-kana-screen';

describe('<GuessKanaScreen />', () => {
  it('initially renders placeholder and first kana', () => {
    const { getByPlaceholderText, getByText } = render(<GuessKanaScreen />);

    expect(getByPlaceholderText('???')).toBeTruthy();
    expect(getByText('あ')).toBeTruthy();
  });

  it('shows comment to try again on first attempt', () => {
    const { getByText, getByTestId } = render(<GuessKanaScreen />);
    const kanaInput = getByTestId('kana-input');

    fireEvent.changeText(kanaInput, 'x');
    expect(getByText(/try/i)).toBeTruthy();
  });

  it('shows comment with correct sound on second attempt', () => {
    const { getByText, getByTestId } = render(<GuessKanaScreen />);
    const kanaInput = getByTestId('kana-input');

    fireEvent.changeText(kanaInput, 'x');
    fireEvent.changeText(kanaInput, 'x');

    expect(getByText(/correct/i)).toBeTruthy();
    expect(getByText('a')).toBeTruthy();
  });

  it('displays next kana on clicking continue after second attempt', () => {
    const { getByText, getByTestId } = render(<GuessKanaScreen />);
    const kanaInput = getByTestId('kana-input');

    fireEvent.changeText(kanaInput, 'x');
    fireEvent.changeText(kanaInput, 'x');
    fireEvent.press(getByText(/continue/i));

    expect(getByText('か')).toBeTruthy();
  });

  it('shows comment very good on correct answer', () => {
    const { getByText, getByTestId } = render(<GuessKanaScreen />);
    const kanaInput = getByTestId('kana-input');

    fireEvent.changeText(kanaInput, 'a');

    expect(getByText(/very good/i)).toBeTruthy();
  });

  it('gives the next kana on correct answer', async () => {
    const { getByText, getByTestId } = render(<GuessKanaScreen />);
    const kanaInput = getByTestId('kana-input');

    fireEvent.changeText(kanaInput, 'a');
    await waitFor(() => expect(getByText('か')).toBeTruthy());
  });
});
