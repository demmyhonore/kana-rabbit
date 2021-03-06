import React from 'react';
import { render } from '@testing-library/react-native';
import { SettingsProvider } from './app/context/settings';
import { KanaProvider } from './app/context/kana';

const AllTheProviders = ({ children }) => (
  <SettingsProvider>
    <KanaProvider>{children}</KanaProvider>
  </SettingsProvider>
);

const customRender = (ui, options) =>
  render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react-native';

export { customRender as render };
