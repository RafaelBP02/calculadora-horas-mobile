import React, { createContext, ReactNode, useState } from "react";

interface Props{
  children: React.ReactNode
}

export type CustomAlertType = {
  inicioExpediente: string;
  inicioIntervalo: string;
  fimIntervalo: string;
  fimExpediente: string;
};

export type PropsNotificationTriggerContext = {
  alertClock: CustomAlertType;
  setAlertClock: React.Dispatch<React.SetStateAction<CustomAlertType>>;
};

export const DEFAULT_ALERT_VALUE = {
  alertClock: {
    inicioExpediente: "08:00",
    inicioIntervalo: "12:00",
    fimIntervalo: "13:00",
    fimExpediente: "17:00",
  },
  setAlertClock: () => {},
};

const NotificationTriggerContext = createContext<PropsNotificationTriggerContext>(DEFAULT_ALERT_VALUE);

const NotificationTriggerContextProvider: React.FC<Props> = ({ children }) => {
  
  const [user, setUser] = useState<CustomAlertType>(DEFAULT_ALERT_VALUE.alertClock);

  return (
    <NotificationTriggerContext.Provider value={{ alertClock: user, setAlertClock: setUser }}>
      {children}
    </NotificationTriggerContext.Provider>
  );
};

export {NotificationTriggerContextProvider};
export default NotificationTriggerContext;
