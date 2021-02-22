import React from 'react';
import { render } from '../../../test-utils';
import CurrentKana from '../current-kana';

describe('<CurrentKana />', () => {
  it('renders kana passed as prop', () => {
    const randomKana = 'あ';
    const { getByText } = render(<CurrentKana kana={randomKana} />);

    expect(getByText(randomKana)).toBeTruthy();
  });
});
