import React, { useContext, createContext, useState, useEffect } from "react";
import { decode } from "jsonwebtoken";
import {
  login as loginAction,
  setTokenToStorage,
  getTokenFromStorage,
} from "../actions/auth";

type UserContextType = {
  token: string;
  doneCheckingAuth: boolean;
  login: (username: string, password: string) => void;
  logout: () => void;
};

const UserContext = createContext<UserContextType>({
  token: "",
  doneCheckingAuth: false,
  login: () => {},
  logout: () => {}
});

const UserProvider: React.FC = (props) => {
  const [token, setToken] = useState<string>("");
  const [doneCheckingAuth, setDoneCheckingAuth] = useState<boolean>(false);

  useEffect(() => {
    const tokenStored = getTokenFromStorage()

    if (tokenStored) {
      const { exp }: any = decode(tokenStored)
      if (Date.now() >= exp * 1000) {
        setToken("");
      } else {
        setToken(tokenStored);
      }
    } else {
      setToken("");
    }
    setDoneCheckingAuth(true);
  }, []);

  useEffect(() => {
    setTokenToStorage(token);
  }, [token])

  const login = async (username: string, password: string) => {
    const requestedToken = await loginAction(username, password);
    setToken(requestedToken);
  };

  const logout = () => {
    setToken("");
  };

  const contextValue = {
    token,
    doneCheckingAuth,
    login,
    logout
  };

  return <UserContext.Provider value={contextValue} {...props} />;
};

const useUser = () => useContext(UserContext);
export { UserProvider, useUser };
