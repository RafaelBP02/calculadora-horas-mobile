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
  user: UserType;
  setUser: React.Dispatch<React.SetStateAction<UserType>>;
};

const DEFAULT_VALUE = {
  user: {
    id: 0,
    email: "",
    role: "",
  },
  setUser: () => {},
};

const AuthContext = createContext<PropsUserContext>(DEFAULT_VALUE);

const AuthContextProvider: React.FC<Props> = ({ children }) => {
  
  const [user, setUser] = useState<UserType>(DEFAULT_VALUE.user);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export {AuthContextProvider};
export default AuthContext;
