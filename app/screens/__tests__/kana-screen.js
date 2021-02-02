import React from "react";

import { render } from "../../../test-utils";

import KanaScreen from "../kana-screen";

describe("<KanaScreen />", () => {
  it("initially renders placeholder", () => {
    const { getByPlaceholderText } = render(<KanaScreen />);

    expect(getByPlaceholderText(/guess/i)).toBeTruthy();
  });
});
