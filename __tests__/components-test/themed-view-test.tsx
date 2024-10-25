import React from 'react';
import { render } from '@testing-library/react-native';
import { ThemedView } from '@/components/ThemedView';

jest.mock('@/hooks/useThemeColor', () => ({
  useThemeColor: jest.fn(),
}));

describe('ThemedView Component', () => {
  it('should apply the correct light theme color', () => {
    const { useThemeColor } = require('@/hooks/useThemeColor');
    useThemeColor.mockReturnValue('#fff');

    const { getByTestId } = render(
      <ThemedView testID="themedView" lightColor="#fff" darkColor="#000" />
    );

    const view = getByTestId('themedView');
    expect(view.props.style).toContainEqual({ backgroundColor: '#fff' });
  });

  it('should apply the correct dark theme color', () => {
    const { useThemeColor } = require('@/hooks/useThemeColor');
    useThemeColor.mockReturnValue('#000');

    const { getByTestId } = render(
      <ThemedView testID="themedView" lightColor="#fff" darkColor="#000" />
    );

    const view = getByTestId('themedView');
    expect(view.props.style).toContainEqual({ backgroundColor: '#000' });
  });
});
