import React, { useEffect, useState } from 'react';
import qs from 'query-string';
import { WebApp } from '@grammyjs/web-app';
import { WebAppInitData, WebAppTheme, WebAppType, WebAppUser } from 'types';
import { UsersApi } from 'api/UsersApi';
import { useTranslation } from 'react-i18next';

const userData: WebAppUser = {
  id: 364984576,
  is_bot: false,
  first_name: 'Alexandr',
  last_name: 'Tarasiuk',
  username: 'alxn_tarasiuk',
  language_code: 'ru',
};

const WebAppContext = React.createContext<WebAppType>({
  user: {
    id: 0,
    first_name: '',
  },
  theme: null,
});

export const WebAppContextProvider: React.FC<{ children: React.ReactNode }> = (props) => {
  const { i18n } = useTranslation();
  const [user, setUser] = useState<WebAppUser>(userData);
  const [theme, setTheme] = useState<WebAppTheme | null>(null);

  useEffect(() => {
    const initData = { user: JSON.stringify(userData) } as object as WebAppInitData;
    // const initData = qs.parse(WebApp.initData) as object as WebAppInitData;

    async function setLocale(userData: WebAppUser) {
      const language_code = await UsersApi.lang(String(userData.id));
      setUser({
        ...userData,
        language_code,
      });
      i18n.changeLanguage(language_code);
    }

    if (initData.user) {
      const userData = JSON.parse(initData.user) as WebAppUser;

      setUser(userData);
      setTheme({
        colorScheme: WebApp.colorScheme,
        headerColor: WebApp.headerColor,
        backgroundColor: WebApp.backgroundColor,
        params: WebApp.themeParams,
      });

      setLocale(userData);
    }
  }, [setUser, setTheme, i18n]);

  const userValue: WebAppType = {
    user,
    theme,
  };

  return <WebAppContext.Provider value={userValue}>{props.children}</WebAppContext.Provider>;
};

export default WebAppContext;
