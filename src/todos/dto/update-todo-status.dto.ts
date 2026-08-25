import { IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { TodoStatus } from '../enums/todo-status.enum';

export class UpdateTodoStatusDto {
  @ApiProperty({
    description: 'สถานะใหม่ของ Todo',
    enum: TodoStatus,
    example: TodoStatus.DONE,
  })
  @IsEnum(TodoStatus, {
    message: `status ต้องเป็นค่าใดค่าหนึ่ง: ${Object.values(TodoStatus).join(', ')}`,
  })
  status: TodoStatus;
}
