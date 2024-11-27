import React from 'react';
import NotificationTriggerContext, { CustomAlertType } from '@/contexts/NotificationTrigger';
import * as Notifications from 'expo-notifications';
import { render } from '@testing-library/react-native';
import NotificationScheduler from '@/components/NotificationScheduler';

jest.mock('expo-notifications', () => ({
  scheduleNotificationAsync: jest.fn(),
}));

const mockScheduleNotificationAsync = Notifications.scheduleNotificationAsync as jest.Mock;

describe('NotificationScheduler', () => {
  const alertClock: CustomAlertType = {
    inicioExpediente: '08:00',
    inicioIntervalo: '12:00',
    fimIntervalo: '13:00',
    fimExpediente: '17:00',
  };

  const setAlertClock = jest.fn(); // Mock da função setAlertClock

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('schedules all notifications at the correct times', async () => {
    render(
      <NotificationTriggerContext.Provider value={{ alertClock, setAlertClock }}>
        <NotificationScheduler />
      </NotificationTriggerContext.Provider>
    );

    // Simulating the useEffect and async calls
    await new Promise(process.nextTick);

    expect(mockScheduleNotificationAsync).toHaveBeenCalledTimes(4);

    expect(mockScheduleNotificationAsync).toHaveBeenCalledWith({
      content: {
        title: 'Início do Expediente',
        body: 'Seu expediente começou!',
      },
      trigger: expect.any(Date),
    });

    expect(mockScheduleNotificationAsync).toHaveBeenCalledWith({
      content: {
        title: 'Início do Intervalo',
        body: 'Hora do intervalo!',
      },
      trigger: expect.any(Date),
    });

    expect(mockScheduleNotificationAsync).toHaveBeenCalledWith({
      content: {
        title: 'Fim do Intervalo',
        body: 'Intervalo terminou, volte ao trabalho!',
      },
      trigger: expect.any(Date),
    });

    expect(mockScheduleNotificationAsync).toHaveBeenCalledWith({
      content: {
        title: 'Fim do Expediente',
        body: 'Seu expediente terminou!',
      },
      trigger: expect.any(Date),
    });
  });
});
