import { AxiosService } from 'services/AxiosService';

async function lang(user_id: string): Promise<string> {
  return AxiosService.get<{ locale: string }>(`/locale/${user_id}`).then((response) => response.data.locale);
}

async function setLang(user_id: string, locale: string): Promise<string> {
  return AxiosService.post<{ message: string }>('/locale', { user_id, locale }).then(
    (response) => response.data.message
  );
}

export const UsersApi = {
  lang,
  setLang,
};
