import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Alert } from 'react-native';
import Calculator from '@/app/(tabs)/calculator';

jest.spyOn(Alert, 'alert');

describe('Calculator Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should show alert for invalid time format', () => {

    const { getByPlaceholderText, getByText } = render(<Calculator />);

    fireEvent.changeText(getByPlaceholderText('Hora início expediente (HH:MM)'), 'invalid');
    fireEvent.press(getByText('calcular'));

    expect(Alert.alert).toHaveBeenCalledWith(
      'Formato de hora inválido',
      'Por favor, apenas números, insira a hora no formato HH:MM.'
    );
  });

  it('should calculate and show correct exit time for valid inputs', () => {
    const { getByPlaceholderText, getByText } = render(<Calculator />);

    fireEvent.changeText(getByPlaceholderText('Hora início expediente (HH:MM)'), '09:00');
    fireEvent.changeText(getByPlaceholderText('Hora início intervalo (HH:MM)'), '12:00');
    fireEvent.changeText(getByPlaceholderText('Hora fim intervalo (HH:MM)'), '13:00');
    fireEvent.press(getByText('calcular'));

    expect(Alert.alert).toHaveBeenCalledWith(
      'Horario de Saída',
      '18:00'
    );
  });

  it('should clear fields when cancel is pressed', () => {
    const { getByPlaceholderText, getByText } = render(<Calculator />);

    const inicioExpedienteInput = getByPlaceholderText('Hora início expediente (HH:MM)');
    const inicioIntervaloInput = getByPlaceholderText('Hora início intervalo (HH:MM)');
    const fimIntervaloInput = getByPlaceholderText('Hora fim intervalo (HH:MM)');

    fireEvent.changeText(inicioExpedienteInput, '09:00');
    fireEvent.changeText(inicioIntervaloInput, '12:00');
    fireEvent.changeText(fimIntervaloInput, '13:00');
    fireEvent.press(getByText('cancelar'));

    expect(inicioExpedienteInput.props.value).toBe('');
    expect(inicioIntervaloInput.props.value).toBe('');
    expect(fimIntervaloInput.props.value).toBe('');
  });
});
