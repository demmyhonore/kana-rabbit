import React from 'react';
import { render } from '../../../test-utils';
import RegularScreen from '../regular-screen';

describe('<RegularScreen />', () => {
  it('applies the custom style that is passed as prop', () => {
    const randomStyle = { color: 'red' };
    const { queryByTestId } = render(<RegularScreen style={randomStyle} />);

    expect(queryByTestId('regular-screen-container')).toHaveStyle(randomStyle);
  });
});
