import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { UpdateTodoStatusDto } from './dto/update-todo-status.dto';
import { FilterTodoDto } from './dto/filter-todo.dto';
import { Todo } from './entities/todo.entity';

@ApiTags('Todos')
@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  /**
   * สร้าง Todo ใหม่
   */
  @Post()
  @ApiOperation({ summary: 'สร้าง Todo ใหม่' })
  @ApiResponse({ status: 201, description: 'สร้าง Todo สำเร็จ', type: Todo })
  @ApiResponse({ status: 400, description: 'ข้อมูลไม่ถูกต้อง (Validation Error)' })
  create(@Body() createTodoDto: CreateTodoDto): Promise<Todo> {
    return this.todosService.create(createTodoDto);
  }

  /**
   * ดึงรายการ Todo ทั้งหมด (พร้อม Search/Filter)
   */
  @Get()
  @ApiOperation({ summary: 'ดึงรายการ Todo ทั้งหมด (รองรับ Search/Filter)' })
  @ApiResponse({ status: 200, description: 'ดึงรายการ Todo สำเร็จ', type: [Todo] })
  findAll(@Query() filterDto: FilterTodoDto): Promise<Todo[]> {
    return this.todosService.findAll(filterDto);
  }

  /**
   * ดึง Todo ตาม ID
   */
  @Get(':id')
  @ApiOperation({ summary: 'ดึง Todo ตาม ID' })
  @ApiParam({ name: 'id', description: 'ID ของ Todo', example: 1 })
  @ApiResponse({ status: 200, description: 'ดึง Todo สำเร็จ', type: Todo })
  @ApiResponse({ status: 404, description: 'ไม่พบ Todo' })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Todo> {
    return this.todosService.findOne(id);
  }

  /**
   * แก้ไข Todo
   */
  @Patch(':id')
  @ApiOperation({ summary: 'แก้ไข Todo' })
  @ApiParam({ name: 'id', description: 'ID ของ Todo', example: 1 })
  @ApiResponse({ status: 200, description: 'แก้ไข Todo สำเร็จ', type: Todo })
  @ApiResponse({ status: 400, description: 'ข้อมูลไม่ถูกต้อง' })
  @ApiResponse({ status: 404, description: 'ไม่พบ Todo' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTodoDto: UpdateTodoDto,
  ): Promise<Todo> {
    return this.todosService.update(id, updateTodoDto);
  }

  /**
   * เปลี่ยนสถานะ Todo
   */
  @Patch(':id/status')
  @ApiOperation({ summary: 'เปลี่ยนสถานะ Todo' })
  @ApiParam({ name: 'id', description: 'ID ของ Todo', example: 1 })
  @ApiResponse({ status: 200, description: 'เปลี่ยนสถานะ Todo สำเร็จ', type: Todo })
  @ApiResponse({ status: 400, description: 'สถานะไม่ถูกต้อง' })
  @ApiResponse({ status: 404, description: 'ไม่พบ Todo' })
  updateStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTodoStatusDto: UpdateTodoStatusDto,
  ): Promise<Todo> {
    return this.todosService.updateStatus(id, updateTodoStatusDto);
  }

  /**
   * ลบ Todo
   */
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'ลบ Todo' })
  @ApiParam({ name: 'id', description: 'ID ของ Todo', example: 1 })
  @ApiResponse({ status: 204, description: 'ลบ Todo สำเร็จ' })
  @ApiResponse({ status: 404, description: 'ไม่พบ Todo' })
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.todosService.remove(id);
  }
}
