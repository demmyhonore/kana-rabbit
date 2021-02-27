import React from 'react';
import { render, fireEvent, waitFor, act } from '../../../test-utils';
import defaultStyles from '../../config/styles';
import GuessKanaScreen from '../guess-kana-screen';

const kanaInputTestID = 'kana-input';
const restartIconTestID = 'restart-icon';

describe('<GuessKanaScreen />', () => {
  it('renders first kana initially', () => {
    const { getByText } = render(<GuessKanaScreen />);

    expect(getByText('あ')).toBeTruthy();
  });

  it('shows try again comment and red input on first mistake', async () => {
    const { getByText, getByTestId } = render(<GuessKanaScreen />);
    const kanaInput = getByTestId(kanaInputTestID);

    fireEvent.changeText(kanaInput, 'x');

    await waitFor(() => expect(getByText(/try again/i)).toBeTruthy());
    expect(kanaInput).toHaveStyle({
      backgroundColor: defaultStyles.colors.carnationPink,
    });
  });

  it('shows correct sound comment and right answer on second mistake', async () => {
    const { getByText, getByTestId } = render(<GuessKanaScreen />);
    const kanaInput = getByTestId(kanaInputTestID);
    fireEvent.changeText(kanaInput, 'x');
    await waitFor(() => expect(getByText(/try again/i)).toBeTruthy());

    fireEvent.changeText(kanaInput, 'x');

    await waitFor(() => expect(getByText(/correct sound/i)).toBeTruthy());
    expect(getByText('a')).toBeTruthy();
  });

  it('shows next kana on pressing continue on second mistake', async () => {
    const { getByText, getByTestId } = render(<GuessKanaScreen />);
    const kanaInput = getByTestId(kanaInputTestID);
    fireEvent.changeText(kanaInput, 'x');
    await waitFor(() => expect(getByText(/try again/i)).toBeTruthy());
    fireEvent.changeText(kanaInput, 'x');
    await waitFor(() => expect(getByText(/correct sound/i)).toBeTruthy());

    fireEvent.press(getByText(/continue/i));

    expect(getByText('か')).toBeTruthy();
  });

  it('shows very good comment and green input on correct answer', async () => {
    const { getByText, getByTestId } = render(<GuessKanaScreen />);
    const kanaInput = getByTestId(kanaInputTestID);

    fireEvent.changeText(kanaInput, 'a');

    await waitFor(() => expect(getByText(/very good/i)).toBeTruthy());
    expect(kanaInput).toHaveStyle({
      backgroundColor: defaultStyles.colors.paleLimeGreen,
    });
  });

  it('shows the next kana automatically after correct answer', async () => {
    const { getByText, getByTestId } = render(<GuessKanaScreen />);
    const kanaInput = getByTestId(kanaInputTestID);

    fireEvent.changeText(kanaInput, 'a');

    await waitFor(() => expect(getByText('か')).toBeTruthy());
  });

  it('calls the pop to top route when reset button is pressed', () => {
    const popToTop = jest.fn();
    const { getByTestId } = render(
      <GuessKanaScreen navigation={{ popToTop }} />
    );
    const restartIcon = getByTestId(restartIconTestID);

    fireEvent.press(restartIcon);

    expect(popToTop).toHaveBeenCalledTimes(1);
  });
});
