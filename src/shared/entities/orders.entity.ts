export type OrderStatus = 'unread' | 'read' | 'fabric' | 'sewing' | 'not started' | 'production' | 'delivery' | 'done';

export interface Order {
  id: string;
  key: string;
  index: number;
  doc_link: string;
  doc_title: string;
  doc_date: string;
  status: OrderStatus;
  desc_fabric?: string | null;
  desc_sewing?: string | null;
  desc_delivery?: string | null;
  fk_user_id: string;
  fk_article_id: string;
  created_at: string;
  updated_at: string;
  deleted_at?: string | null;
}
