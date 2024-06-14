import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

import { en, ru, cn } from './locales';
import { i18nOpts } from './settings';

i18next.use(initReactI18next).init({
  ...i18nOpts,
  resources: { en, ru, cn },
});
