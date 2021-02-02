import React from "react";

import { render } from "../../../test-utils";

import Screen from "../screen";

describe("<Screen />", () => {
  it("renders KeyboardAvoidingView if avoidKeyboard is passed as prop", () => {
    const { queryByTestId } = render(<Screen avoidKeyboard />);

    expect(queryByTestId("keyboard-avoiding-view")).toBeTruthy();
  });

  it("renders View if avoidKeyboard is not passed as prop", () => {
    const { queryByTestId } = render(<Screen />);

    expect(queryByTestId("regular-view")).toBeTruthy();
  });

  it("applies the correct style if style is passed as prop", () => {
    const randomStyle = { color: "red" };
    const { queryByTestId } = render(<Screen style={randomStyle} />);

    expect(queryByTestId("regular-view")).toHaveStyle(randomStyle);
  });
});
