import { IsString, IsNotEmpty, IsEmpty } from 'class-validator';
import { OrderStatus } from 'shared/entities';

export class HistoryDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  status: OrderStatus;

  @IsString()
  @IsEmpty()
  desc: string | null;
  
  @IsString()
  @IsNotEmpty()
  fk_order_id: string;
  
  @IsString()
  @IsNotEmpty()
  created_at: string;
}
