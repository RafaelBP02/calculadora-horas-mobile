import * as Notifications from 'expo-notifications';
import NotificationTriggerContext, { CustomAlertType } from '@/contexts/NotificationTrigger';
import React, { useContext, useEffect } from 'react';

const scheduleNotifications = async (alertClock: CustomAlertType) => {
  const scheduleNotification = async (time: string, title: string, body: string) => {
    const [hour, minute] = time.split(':').map(Number);
    const trigger = new Date(Date.now());
    trigger.setHours(hour);
    trigger.setMinutes(minute);

    await Notifications.scheduleNotificationAsync({
      content: {
        title: title,
        body: body,
      },
      trigger,
    });
  };

  await scheduleNotification(alertClock.inicioExpediente, 'Início do Expediente', 'Seu expediente começou!');
  await scheduleNotification(alertClock.inicioIntervalo, 'Início do Intervalo', 'Hora do intervalo!');
  await scheduleNotification(alertClock.fimIntervalo, 'Fim do Intervalo', 'Intervalo terminou, volte ao trabalho!');
  await scheduleNotification(alertClock.fimExpediente, 'Fim do Expediente', 'Seu expediente terminou!');
};

const NotificationScheduler = () => {
  const { alertClock } = useContext(NotificationTriggerContext);

  useEffect(() => {
    scheduleNotifications(alertClock);
  }, [alertClock]);

  return null;
};

export default NotificationScheduler;