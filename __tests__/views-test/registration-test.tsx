import React from 'react';
import { render, RenderAPI, fireEvent, waitFor } from '@testing-library/react-native';
import { NativeStackNavigationProp, NativeStackScreenProps } from 'react-native-screens/lib/typescript/native-stack/types';
import { RootStackParamList } from '@/constants/customTypes';
import Registration from '@/app/views/registration';
import { UserAuthentication } from '@/app/controller/authenticationController';

jest.mock('@/app/controller/authenticationController', () => ({
  UserAuthentication: {
    registration: jest.fn().mockResolvedValue({ concluido: true }),
  },
}));

type HomeProps = NativeStackNavigationProp<RootStackParamList, "Registration">;

describe('Registration Component', () => {
  const mockNavigate = jest.fn();
  const mockNavigation: HomeProps = {
    navigate: mockNavigate,
  } as any;
  const mockRoute: any = {};

  let getByPlaceholderText: RenderAPI['getByPlaceholderText'];
  let getByText: RenderAPI['getByText'];

  beforeEach(() => {
    const rendered = render(<Registration  navigation={mockNavigation} route={mockRoute}/>);
    getByPlaceholderText = rendered.getByPlaceholderText;
    getByText = rendered.getByText;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render correctly', () => {
    expect(getByPlaceholderText('seuEmail@mail.com')).toBeTruthy();
  });

  it('should handle registration submission', async () => {
    fireEvent.changeText(getByPlaceholderText('seuEmail@mail.com'), 'test@test.com');
    fireEvent.changeText(getByPlaceholderText('Seu Nome'), 'John');
    fireEvent.changeText(getByPlaceholderText('Seu Sobrenome'), 'Doe');
    fireEvent.changeText(getByPlaceholderText('Seu Local de Trabalho'), 'Workplace');
    fireEvent.changeText(getByPlaceholderText('digite sua senha'), 'password');
    fireEvent.changeText(getByPlaceholderText('repita sua senha'), 'password');

    fireEvent.press(getByText('Enviar'));

    await waitFor(() => {
      expect(UserAuthentication.registration).toHaveBeenCalledWith(
        'test@test.com',
        'password',
        'John',
        'Doe',
        'Workplace'
      );
    });

    expect(mockNavigate).toHaveBeenCalledWith('Login');
  });

  it('should not proceed with invalid email', async () => {
    fireEvent.changeText(getByPlaceholderText('seuEmail@mail.com'), 'invalideMail');

    fireEvent.press(getByText('Enviar'));

    await waitFor(() => {
      expect(UserAuthentication.registration).not.toHaveBeenCalled();
    });
  });
});
