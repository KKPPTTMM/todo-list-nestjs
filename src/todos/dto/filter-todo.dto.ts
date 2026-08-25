import { IsOptional, IsString, IsEnum } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { TodoStatus } from '../enums/todo-status.enum';

export class FilterTodoDto {
  @ApiPropertyOptional({
    description: 'คำค้นหา (ค้นใน title และ description)',
    example: 'ซื้อของ',
  })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional({
    description: 'กรองตามสถานะ',
    enum: TodoStatus,
    example: TodoStatus.PENDING,
  })
  @IsOptional()
  @IsEnum(TodoStatus, {
    message: `status ต้องเป็นค่าใดค่าหนึ่ง: ${Object.values(TodoStatus).join(', ')}`,
  })
  status?: TodoStatus;
}
