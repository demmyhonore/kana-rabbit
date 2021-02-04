jest.mock("react-native/Libraries/Utilities/Platform", () => ({
  OS: "ios",
  select: () => {},
}));
