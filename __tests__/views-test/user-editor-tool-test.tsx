import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { Alert } from 'react-native';
import TokenContext from '@/contexts/Token';
import { NavigationContainer } from '@react-navigation/native';
import UserEditorTool from '@/app/views/userEditorTool';
import { AdministrationController } from '@/app/controller/administrationController';

jest.mock('@/app/controller/administrationController', () => {
    return {
      AdministrationController: {
        updateUser: jest.fn().mockResolvedValue({}),
      },
    };
  });

jest.spyOn(Alert, 'alert');

const mockNavigation = {
  navigate: jest.fn(),
};

const mockRoute = {
  params: {
    selectedUser: {
      id: 1,
      workplace: 'Old Workplace',
      name: 'John',
      surename: 'Doe',
      eMail: 'john.doe@example.com',
      role: { roleName: 'Admin' },
    },
  },
};

describe('UserEditorTool', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders user data correctly', () => {
    const { getByText, getByDisplayValue } = render(
      <NavigationContainer>
        <TokenContext.Provider value={{ token: 'test-token', setToken: jest.fn() }}>
          <UserEditorTool navigation={mockNavigation as any} route={mockRoute as any} />
        </TokenContext.Provider>
      </NavigationContainer>
    );

    expect(getByText('Dados de John Doe')).toBeTruthy();
    expect(getByText('e-mail')).toBeTruthy();
    expect(getByText('john.doe@example.com')).toBeTruthy();
    expect(getByText('permissão')).toBeTruthy();
    expect(getByText('Admin')).toBeTruthy();
    expect(getByDisplayValue('Old Workplace')).toBeTruthy();
  });

  it('updates workplace and calls updateUser', async () => {
    const { getByDisplayValue, getByText } = render(
      <NavigationContainer>
        <TokenContext.Provider value={{ token: 'test-token', setToken: jest.fn() }}>
          <UserEditorTool navigation={mockNavigation as any} route={mockRoute as any} />
        </TokenContext.Provider>
      </NavigationContainer>
    );

    const newWorkplace = 'New Workplace';
    fireEvent.changeText(getByDisplayValue('Old Workplace'), newWorkplace);
    fireEvent.press(getByText('salvar'));

    await waitFor(() => {
      expect(AdministrationController.updateUser).toHaveBeenCalledWith(
        'test-token',
        1,
        newWorkplace
      );
    });

    expect(Alert.alert).toHaveBeenCalledWith('Sucesso!', 'Usuario editado com sucesso!');
  });

  it('navigates back when "voltar" is pressed', () => {
    const { getByText } = render(
      <NavigationContainer>
        <TokenContext.Provider value={{ token: 'test-token', setToken: jest.fn() }}>
          <UserEditorTool navigation={mockNavigation as any} route={mockRoute as any} />
        </TokenContext.Provider>
      </NavigationContainer>
    );

    fireEvent.press(getByText('voltar'));

    expect(mockNavigation.navigate).toHaveBeenCalledWith('EditUsers');
  });
});
