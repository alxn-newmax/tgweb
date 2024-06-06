import { ActiveOrderDto, OrderNextDto } from 'shared/dtos';
import { AxiosService } from 'services/AxiosService';

async function list(user_id: string): Promise<OrderNextDto[]> {
  return AxiosService.post<{ data: OrderNextDto[] }>('/orders/list', { user_id }).then(
    (response) => response.data.data
  );
}

async function byId(order_key: string): Promise<{ order?: ActiveOrderDto; error?: any }> {
  return AxiosService.get<ActiveOrderDto>(`/orders/${order_key}`)
    .then((response) => {
      return { order: response.data };
    })
    .catch((err) => ({ error: err }));
}

async function updateStatus(message: string, order_key: string): Promise<ActiveOrderDto> {
  return AxiosService.post<ActiveOrderDto>('/orders', { message, order_key }).then((response) => {
    return response.data;
  });
}

export const OrdersApi = {
  list,
  byId,
  updateStatus,
};
