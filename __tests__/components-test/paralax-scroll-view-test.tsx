import React from 'react';
import { render } from '@testing-library/react-native';
import { ThemedView } from '@/components/ThemedView';
import Animated from 'react-native-reanimated';
import ParallaxScrollView from '@/components/ParallaxScrollView';

jest.mock('react-native/Libraries/Utilities/useColorScheme', () => ({
  __esModule: true,
  default: jest.fn(() => 'light'),
}));

jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');
  return {
    ...Reanimated,
    useAnimatedRef: jest.fn(),
    useScrollViewOffset: jest.fn(() => ({ value: 0 })),
    useAnimatedStyle: jest.fn(() => ({})),
  };
});

describe('ParallaxScrollView Component', () => {
  it('should render correctly with header image and children', () => {
    const headerImage = <ThemedView testID="headerImage" />;
    const children = <ThemedView testID="children" />;

    const { getByTestId } = render(
      <ParallaxScrollView
        headerImage={headerImage}
        headerBackgroundColor={{ light: '#fff', dark: '#000' }}
      >
        {children}
      </ParallaxScrollView>
    );

    expect(getByTestId('headerImage')).toBeTruthy();
    expect(getByTestId('children')).toBeTruthy();
  });

  it('should apply animated styles to the header', () => {
    const headerImage = <ThemedView testID="headerImage" />;
    const { getByTestId } = render(
      <ParallaxScrollView
        headerImage={headerImage}
        headerBackgroundColor={{ light: '#fff', dark: '#000' }}
      />
    );

  });
});
