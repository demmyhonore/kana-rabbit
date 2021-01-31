import React from "react";

import { render } from "@testing-library/react-native";

import CurrentKana from "../current-kana";

describe("<CurrentKana />", () => {
  it("renders kana symbol if kana is passed as prop", () => {
    const testKana = { symbol: "X" };
    const { getByText } = render(<CurrentKana kana={testKana} />);

    expect(getByText("X")).toBeTruthy();
  });
});
