import React from 'react';
import { render } from '../../../test-utils';
import OptionText from '../option-text';

const randomText = 'aa';

describe('<OptionText />', () => {
  it('renders text when passed as prop', () => {
    const { getByText } = render(<OptionText text={randomText} />);

    expect(getByText(randomText)).toBeTruthy();
  });

  it('renders custom style when passed as prrop', () => {
    const customStyle = { color: 'red' };
    const { getByText } = render(
      <OptionText text={randomText} style={customStyle} />
    );

    expect(getByText(randomText)).toHaveStyle(customStyle);
  });
});
