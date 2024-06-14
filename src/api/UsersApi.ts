import { AxiosService } from 'services/AxiosService';
import { UserDto } from 'shared/dtos';

async function info(user_id: string): Promise<UserDto> {
  return AxiosService.get<{ data: UserDto }>(`/users/${user_id}`).then(({ data }) => data.data);
}

async function setLang(user_id: string, locale: string): Promise<string> {
  return AxiosService.post<{ message: string }>('/locale', { user_id, locale }).then(
    (response) => response.data.message
  );
}

export const UsersApi = {
  info,
  setLang,
};
