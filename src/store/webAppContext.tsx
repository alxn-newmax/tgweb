import React, { useEffect, useState } from 'react';
import qs from 'query-string';
import { WebApp } from '@grammyjs/web-app';
import { WebAppInitData, WebAppTheme, WebAppUser } from 'types';

type WebAppType = {
  user: WebAppUser | null;
  theme: WebAppTheme | null;
  isLoading: boolean;
};

const WebAppContext = React.createContext<WebAppType>({
  user: null,
  theme: null,
  isLoading: false,
});

export const WebAppContextProvider: React.FC<{ children: React.ReactNode }> = (props) => {
  const [user, setUser] = useState<WebAppUser | null>(null);
  const [theme, setTheme] = useState<WebAppTheme | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const initData = qs.parse(WebApp.initData) as object as WebAppInitData;

    if (initData.user) {
      const userData = JSON.parse(initData.user) as WebAppUser;

      setUser(userData);
      setTheme({
        colorScheme: WebApp.colorScheme,
        headerColor: WebApp.headerColor,
        backgroundColor: WebApp.backgroundColor,
        params: WebApp.themeParams,
      });
    }

    setIsLoading(true);
  }, [setUser, setTheme]);

  const userValue: WebAppType = {
    user,
    theme,
    isLoading,
  };

  return <WebAppContext.Provider value={userValue}>{props.children}</WebAppContext.Provider>;
};

export default WebAppContext;
