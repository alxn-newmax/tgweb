import { IsString, IsNotEmpty } from 'class-validator';
import { OrderStatus } from 'shared/entities';

export class HistoryDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  status: OrderStatus;

  @IsString()
  @IsNotEmpty()
  desc: string;

  @IsString()
  @IsNotEmpty()
  fk_order_id: string;

  @IsString()
  @IsNotEmpty()
  created_at: string;
}
