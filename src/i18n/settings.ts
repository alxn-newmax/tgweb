import { LangTypes, NsTypes } from 'types';

export const defaultLng: LangTypes = 'en';
export const defaultNS: NsTypes = 'common';
export const languages: LangTypes[] = [defaultLng, 'ru', 'cn'];

export const i18nOpts = {
  fallbackLng: defaultLng,
  fallbackNS: defaultNS,
  lng: defaultLng,
  supportedLngs: languages,
  ns: defaultNS,
  defaultNS,
};
