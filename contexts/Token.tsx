import React, { createContext, ReactNode, useState } from "react";

interface Props{
  children: React.ReactNode
}

export type PropsTokenContext = {
  token: string;
  setToken: React.Dispatch<React.SetStateAction<string>>;
};

export const DEFAULT_TOKEN = {
  token: '',
  setToken: () => {},
};

const TokenContext = createContext<PropsTokenContext>(DEFAULT_TOKEN);

const TokenContextProvider: React.FC<Props> = ({ children }) => {
  
  const [token, setToken] = useState<string>(DEFAULT_TOKEN.token);

  return (
    <TokenContext.Provider value={{ token, setToken }}>
      {children}
    </TokenContext.Provider>
  );
};

export {TokenContextProvider};
export default TokenContext;
