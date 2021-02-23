import React from 'react';
import { render } from '../../../test-utils';
import Comment from '../comment';

const randomComment = 'aa';

let mockIsTablet;
afterEach(() => {
  mockIsTablet = false;
});
jest.mock('../../hooks/use-detect-tablet', () => ({
  useDetectTablet: () => mockIsTablet,
}));

describe('<Comment />', () => {
  it('renders text with default font size when passed as prop', () => {
    const { getByText } = render(<Comment text={randomComment} />);

    expect(getByText(randomComment)).toBeTruthy();
    expect(getByText(randomComment)).toHaveStyle({ fontSize: 60 });
  });

  it('renders text with smaller font size when isSmall is passed as prop', () => {
    const { getByText } = render(<Comment text={randomComment} isSmall />);

    expect(getByText(randomComment)).toHaveStyle({ fontSize: 40 });
  });

  it('renders text with bigger font size when tablet is detected', () => {
    mockIsTablet = true;
    const { getByText } = render(<Comment text={randomComment} />);

    expect(getByText(randomComment)).toHaveStyle({ fontSize: 100 });
  });

  it('renders kana with slightly smaller font size when isSmall is passed as prop and tablet is detected', () => {
    mockIsTablet = true;
    const { getByText } = render(<Comment text={randomComment} isSmall />);

    expect(getByText(randomComment)).toHaveStyle({ fontSize: 65 });
  });

  it('renders custom style when passed as prop', () => {
    const customStyle = { color: 'red' };
    const { getByText } = render(
      <Comment style={customStyle} text={randomComment} />
    );

    expect(getByText(randomComment)).toHaveStyle(customStyle);
  });
});
