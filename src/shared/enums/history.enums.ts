import { OrderStatus } from 'shared/entities';

export const statusDescEnum: Record<OrderStatus, string> = {
  unread: 'The order was successfully created.',
  read: 'Supplier read message.',
  fabric: 'Fabric is ready.',
  production: 'Production is in progress.',
  delivery: 'Order is being delivered.',
  done: 'Order is completed.',
};
