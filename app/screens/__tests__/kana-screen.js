import React from "react";

import { render, fireEvent } from "../../../test-utils";

import KanaScreen from "../kana-screen";

describe("<KanaScreen />", () => {
  it("initially renders the placeholder and the first kana", () => {
    const { getByPlaceholderText, getByText } = render(<KanaScreen />);

    expect(getByPlaceholderText(/guess/i)).toBeTruthy();
    expect(getByText("あ")).toBeTruthy();
  });

  it("shows a try again message on first attempt", () => {
    const { getByText, getByTestId } = render(<KanaScreen />);
    const kanaInput = getByTestId("kana-input");

    fireEvent.changeText(kanaInput, "x");
    expect(getByText(/try/i)).toBeTruthy();
  });

  it("shows the correct answer on second attempt", () => {
    const { getByText, getByTestId } = render(<KanaScreen />);
    const kanaInput = getByTestId("kana-input");

    fireEvent.changeText(kanaInput, "x");
    fireEvent.changeText(kanaInput, "x");

    expect(getByText(/correct answer/i)).toBeTruthy();
  });

  it("gives the next kana when asking to proceed on second attempt", () => {
    const { getByText, getByTestId } = render(<KanaScreen />);
    const kanaInput = getByTestId("kana-input");

    fireEvent.changeText(kanaInput, "x");
    fireEvent.changeText(kanaInput, "x");
    fireEvent.press(getByText(/gimme/i));

    expect(getByText("か")).toBeTruthy();
  });

  it("gives the next kana on correct answer", () => {
    const { getByText, getByTestId } = render(<KanaScreen />);
    const kanaInput = getByTestId("kana-input");

    fireEvent.changeText(kanaInput, "ka");

    expect(getByText("さ")).toBeTruthy();
  });
});
