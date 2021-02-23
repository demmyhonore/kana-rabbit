import React from 'react';
import { render } from '../../../test-utils';
import Text from '../text';

const randomText = 'aa';

let mockIsTablet;
afterEach(() => {
  mockIsTablet = false;
});
jest.mock('../../hooks/use-detect-tablet', () => ({
  useDetectTablet: () => mockIsTablet,
}));

describe('<Text />', () => {
  it('renders text with default font size when passed as prop', () => {
    const { getByText } = render(<Text text={randomText} />);

    expect(getByText(randomText)).toBeTruthy();
    expect(getByText(randomText)).toHaveStyle({ fontSize: 24 });
  });

  it('renders text with bigger font size when tablet is detected', () => {
    mockIsTablet = true;
    const { getByText } = render(<Text text={randomText} />);

    expect(getByText(randomText)).toHaveStyle({ fontSize: 40 });
  });

  it('renders text centrally aligned when isCenter is passed as prop', () => {
    const { getByText } = render(<Text text={randomText} isCenter />);

    expect(getByText(randomText)).toHaveStyle({ textAlign: 'center' });
  });
});
