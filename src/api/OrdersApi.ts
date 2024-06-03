import { OrderDto, ActiveOrderDto } from 'shared/dtos';
import { AxiosService } from 'services/AxiosService';

async function list(): Promise<OrderDto> {
  return AxiosService.get<OrderDto>('/orders').then((response) => response.data);
}

async function byId(order_key: string): Promise<ActiveOrderDto> {
  return AxiosService.get<ActiveOrderDto>(`/orders/${order_key}`).then((response) => {
    return response.data;
  });
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
