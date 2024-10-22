import React, { createContext, ReactNode, useState } from "react";

interface Props{
  children: React.ReactNode
}

type UserType = {
  id: number;
  email: string;
  role: string;
};

type PropsUserContext = {
  state: UserType;
  setState: React.Dispatch<React.SetStateAction<UserType>>;
};

const DEFAULT_VALUE = {
  state: {
    id: 0,
    email: "",
    role: "",
  },
  setState: () => {},
};

const AuthContext = createContext<PropsUserContext>(DEFAULT_VALUE);

const AuthContextProvider: React.FC<Props> = ({ children }) => {
  
  const [state, setState] = useState<UserType>(DEFAULT_VALUE.state);

  return (
    <AuthContext.Provider value={{ state, setState }}>
      {children}
    </AuthContext.Provider>
  );
};

export {AuthContextProvider};
export default AuthContext;
