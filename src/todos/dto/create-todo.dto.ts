import { IsNotEmpty, IsString, IsOptional, MaxLength, MinLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateTodoDto {
  @ApiProperty({
    description: 'ชื่อของ Todo',
    example: 'ซื้อของที่ตลาด',
    minLength: 1,
    maxLength: 100,
  })
  @IsNotEmpty({ message: 'title ห้ามเป็นค่าว่าง' })
  @IsString({ message: 'title ต้องเป็น string' })
  @MinLength(1, { message: 'title ต้องมีอย่างน้อย 1 ตัวอักษร' })
  @MaxLength(100, { message: 'title ต้องมีไม่เกิน 100 ตัวอักษร' })
  title: string;

  @ApiPropertyOptional({
    description: 'รายละเอียดของ Todo',
    example: 'ซื้อผัก ผลไม้ และเนื้อสัตว์',
    maxLength: 500,
  })
  @IsOptional()
  @IsString({ message: 'description ต้องเป็น string' })
  @MaxLength(500, { message: 'description ต้องมีไม่เกิน 500 ตัวอักษร' })
  description?: string;
}
