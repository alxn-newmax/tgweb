import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import en_ns1 from './en/ns1.json';
import ru_ns1 from './ru/ns1.json';
import cn_ns1 from './cn/ns1.json';

export const defaultNS = 'ns1';

i18next.use(initReactI18next).init({
  lng: 'en',
  debug: true,
  resources: {
    en: { ns1: en_ns1 },
    ru: { ns1: ru_ns1 },
    cn: { ns1: cn_ns1 },
  },
  defaultNS,
});
