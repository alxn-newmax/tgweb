import React, { useEffect, useState } from 'react';
import qs from 'query-string';
import { WebApp } from '@grammyjs/web-app';
import { WebAppInitData, WebAppTheme, WebAppType, WebAppUser } from 'types';

const WebAppContext = React.createContext<WebAppType>({
  user: {
    id: 0,
    first_name: '',
  },
  theme: null,
});

export const WebAppContextProvider: React.FC<{ children: React.ReactNode }> = (props) => {
  const [user, setUser] = useState<WebAppUser>({
    id: 6711264839,
    is_bot: false,
    first_name: 'Newmax',
    last_name: 'Tech',
    username: 'newmax_tech',
    language_code: 'ru',
  });
  const [theme, setTheme] = useState<WebAppTheme | null>(null);

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

      WebApp.expand();
    }
  }, [setUser, setTheme]);

  const userValue: WebAppType = {
    user,
    theme,
  };

  return <WebAppContext.Provider value={userValue}>{props.children}</WebAppContext.Provider>;
};

export default WebAppContext;
