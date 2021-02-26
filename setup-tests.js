jest.mock('react-native/Libraries/Utilities/Platform', () => ({
  OS: 'ios',
  select: () => {},
}));

jest.mock('@expo/vector-icons', () => ({ MaterialCommunityIcons: 'Icon' }));