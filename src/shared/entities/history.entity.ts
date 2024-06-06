import { OrderStatus } from './orders.entity';

export interface History {
  id: string;
  status: OrderStatus;
  desc: string;
  fk_order_id: string;
  created_at: string;
}
