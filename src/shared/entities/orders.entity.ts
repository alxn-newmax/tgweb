export type OrderStatus = 'unread' | 'fabric' | 'production' | 'delivery' | 'done';

export interface Order {
  id: string;
  key: string;
  index: number;
  doc_link: string;
  doc_title: string;
  doc_date: string;
  status: OrderStatus;
  desc_fabric?: string | null;
  desc_production?: string | null;
  desc_delivery?: string | null;
  desc_done?: string | null;
  fk_user_id: string;
  fk_article_id: string;
  created_at: string;
  updated_at: string;
  deleted_at?: string | null;
}

export interface OrderNext extends Order {
  next_status: OrderStatus;
}
