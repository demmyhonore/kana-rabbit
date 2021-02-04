import React from "react";

import { render, fireEvent } from "../../../test-utils";

import KanaInput from "../kana-input";

describe("<KanaInput />", () => {
  it("shows placeholder if placeholder is passed as prop", () => {
    const { getByPlaceholderText } = render(<KanaInput placeholder="aa" />);

    expect(getByPlaceholderText("aa")).toBeTruthy();
  });

  it("fires callback if text is added to input", () => {
    const callback = jest.fn();
    const { getByTestId } = render(<KanaInput onChange={callback} />);
    const kanaInput = getByTestId("kana-input");

    fireEvent.changeText(kanaInput, "a");

    expect(callback).toBeCalledWith("a");
  });
});
