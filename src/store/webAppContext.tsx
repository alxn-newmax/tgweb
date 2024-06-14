import React, { useEffect, useState } from 'react';
import qs from 'query-string';
import { WebApp } from '@grammyjs/web-app';
import { WebAppInitData, WebAppTheme, WebAppType, WebAppUser } from 'types';
import { UsersApi } from 'api/UsersApi';
import { useTranslation } from 'react-i18next';

const ENV = 'test';

const userTestData: WebAppUser = {
  id: 364984576,
  is_bot: false,
  first_name: 'Alexandr',
  last_name: 'Tarasiuk',
  username: 'alxn_tarasiuk',
  language_code: 'ru',
};

const WebAppContext = React.createContext<WebAppType>({
  user: null,
  theme: null,
  verified: false,
});

export const WebAppContextProvider: React.FC<{ children: React.ReactNode }> = (props) => {
  const { i18n } = useTranslation();
  const [user, setUser] = useState<WebAppUser | null>(null);
  const [theme, setTheme] = useState<WebAppTheme | null>(null);
  const [verified, setVerified] = useState<boolean>(false);

  useEffect(() => {
    const initData = qs.parse(WebApp.initData) as object as WebAppInitData;

    // Remove this stroke
    if (ENV === 'test') initData.user = JSON.stringify(userTestData);

    async function parseUser(userData: string) {
      const user = JSON.parse(userData) as WebAppUser;

      const userInfo = await UsersApi.info(String(user.id));

      setUser({
        ...userInfo,
        language_code: userInfo.locale_code,
      });

      setTheme({
        colorScheme: WebApp.colorScheme,
        headerColor: WebApp.headerColor,
        backgroundColor: WebApp.backgroundColor,
        params: WebApp.themeParams,
      });

      i18n.changeLanguage(userInfo.locale_code);

      setVerified(true);
    }

    if (initData.user) parseUser(initData.user);
  }, [setUser, setTheme, i18n]);

  const userValue: WebAppType = {
    user,
    theme,
    verified,
  };

  return <WebAppContext.Provider value={userValue}>{props.children}</WebAppContext.Provider>;
};

export default WebAppContext;
