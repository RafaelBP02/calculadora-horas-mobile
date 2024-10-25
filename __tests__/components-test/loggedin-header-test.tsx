import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import AuthContext, { DEFAULT_VALUE } from '@/contexts/Auth';
import LoggedInHeader from '@/components/LoggedInHeader';

describe('LoggedInHeader Component', () => {
  it('should render welcome message when user is logged in', () => {
    const mockUser = { email: 'user@example.com', id: 1, role: 'user' };
    const setUser = jest.fn();

    const { getByText } = render(
      <AuthContext.Provider value={{ user: mockUser, setUser }}>
        <LoggedInHeader />
      </AuthContext.Provider>
    );

    expect(getByText(`Bem vindo(a) ${mockUser.email}`)).toBeTruthy();
  });

  it('should not render when no user is logged in', () => {
    const setUser = jest.fn();

    const { queryByText } = render(
      <AuthContext.Provider value={{ user: DEFAULT_VALUE.user, setUser }}>
        <LoggedInHeader />
      </AuthContext.Provider>
    );

    expect(queryByText(/Bem vindo(a)/)).toBeNull();
  });

  it('should call setUser with DEFAULT_VALUE.user when logout is pressed', () => {
    const mockUser = { email: 'user@example.com', id: 1, role: 'user' };
    const setUser = jest.fn();

    const { getByText } = render(
      <AuthContext.Provider value={{ user: mockUser, setUser }}>
        <LoggedInHeader />
      </AuthContext.Provider>
    );

    const logoutButton = getByText('Logout');
    fireEvent.press(logoutButton);

    expect(setUser).toHaveBeenCalledWith(DEFAULT_VALUE.user);
  });
});
