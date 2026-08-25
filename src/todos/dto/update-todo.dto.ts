import { IsOptional, IsString, IsEnum, MaxLength } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { TodoStatus } from '../enums/todo-status.enum';

export class UpdateTodoDto {
  @ApiPropertyOptional({
    description: 'ชื่อของ Todo',
    example: 'ซื้อของที่ห้าง',
    minLength: 1,
    maxLength: 100,
  })
  @IsOptional()
  @IsString({ message: 'title ต้องเป็น string' })
  @MaxLength(100, { message: 'title ต้องมีไม่เกิน 100 ตัวอักษร' })
  title?: string;

  @ApiPropertyOptional({
    description: 'รายละเอียดของ Todo',
    example: 'ซื้อผัก ผลไม้ เนื้อสัตว์ และขนมปัง',
    maxLength: 500,
  })
  @IsOptional()
  @IsString({ message: 'description ต้องเป็น string' })
  @MaxLength(500, { message: 'description ต้องมีไม่เกิน 500 ตัวอักษร' })
  description?: string;

  @ApiPropertyOptional({
    description: 'สถานะของ Todo',
    enum: TodoStatus,
    example: TodoStatus.IN_PROGRESS,
  })
  @IsOptional()
  @IsEnum(TodoStatus, {
    message: `status ต้องเป็นค่าใดค่าหนึ่ง: ${Object.values(TodoStatus).join(', ')}`,
  })
  status?: TodoStatus;
}
