import React from 'react';
import { render } from '../../../test-utils';
import CurrentKana from '../current-kana';

const randomKana = 'あ';

let mockIsTablet;
afterEach(() => {
  mockIsTablet = false;
});
jest.mock('../../hooks/use-detect-tablet', () => ({
  useDetectTablet: () => mockIsTablet,
}));

describe('<CurrentKana />', () => {
  it('renders kana when passed as prop', () => {
    const { getByText } = render(<CurrentKana kana={randomKana} />);

    expect(getByText(randomKana)).toBeTruthy();
  });

  it('renders kana with smaller font size when isCombined is passed as prop', () => {
    const { getByText } = render(<CurrentKana kana={randomKana} isCombined />);

    expect(getByText(randomKana)).toHaveStyle({ fontSize: 120 });
  });

  it('renders kana with bigger font size when tablet is detected', () => {
    mockIsTablet = true;
    const { getByText } = render(<CurrentKana kana={randomKana} />);

    expect(getByText(randomKana)).toHaveStyle({ fontSize: 300 });
  });

  it('renders kana with slightly bigger font size when isCombined is passed as prop and tablet is detected', () => {
    mockIsTablet = true;
    const { getByText } = render(<CurrentKana kana={randomKana} isCombined />);

    expect(getByText(randomKana)).toHaveStyle({ fontSize: 200 });
  });
});
