import React from 'react';
import { render } from '@testing-library/react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';

jest.mock('@expo/vector-icons/Ionicons', () => 'Ionicons');

describe('TabBarIcon', () => {
  it('renders correctly with default props', () => {
    const { getByTestId } = render(<TabBarIcon name="home" />);
    const icon = getByTestId('icon');

    expect(icon).toBeTruthy();
  });

  it('applies the style prop correctly', () => {
    const style = { color: 'red' };
    const { getByTestId } = render(<TabBarIcon name="home" style={style} />);
    const icon = getByTestId('icon');

    expect(icon.props.style).toEqual(expect.arrayContaining([{ marginBottom: -3 }, style]));
  });

  it('passes the correct size prop to Ionicons', () => {
    const size = 28;
    const { getByTestId } = render(<TabBarIcon name="home" />);
    const icon = getByTestId('icon');

    expect(icon.props.size).toBe(size);
  });
});
