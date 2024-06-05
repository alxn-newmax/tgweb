import { IsString, IsNotEmpty, IsEmpty } from 'class-validator';
import { OrderStatus } from 'shared/entities';
import { HistoryDto } from './history.dto';

export class OrderDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  key: string;

  @IsString()
  @IsNotEmpty()
  index: number;

  @IsString()
  @IsNotEmpty()
  doc_link: string;

  @IsString()
  @IsNotEmpty()
  doc_title: string;

  @IsString()
  @IsNotEmpty()
  doc_date: string;

  @IsString()
  @IsNotEmpty()
  status: OrderStatus;

  @IsString()
  @IsEmpty()
  desc_fabric: string | null;

  @IsString()
  @IsEmpty()
  desc_sewing: string | null;

  @IsString()
  @IsEmpty()
  desc_delivery: string | null;

  @IsString()
  @IsNotEmpty()
  fk_user_id: string;

  @IsString()
  @IsNotEmpty()
  fk_article_id: string;

  @IsString()
  @IsNotEmpty()
  created_at: string;

  @IsString()
  @IsNotEmpty()
  updated_at: string;

  @IsString()
  @IsEmpty()
  deleted_at: string | null;
}

export class OrderNextDto extends OrderDto {
  @IsString()
  @IsNotEmpty()
  next_status: OrderStatus;
}

export class ActiveOrderDto {
  data: OrderDto;

  history: {
    messages: HistoryDto[];
    confirm: boolean;
    status: OrderStatus;
  }[];

  @IsString()
  next_status: OrderStatus;
}
