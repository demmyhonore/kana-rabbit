import React from "react";

import { render } from "@testing-library/react-native";

import { KanaProvider } from "./app/context/kana";

const AllTheProviders = ({ children }) => {
  return <KanaProvider>{children}</KanaProvider>;
};

const customRender = (ui, options) =>
  render(ui, { wrapper: AllTheProviders, ...options });

export * from "@testing-library/react-native";

export { customRender as render };
