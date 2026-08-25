import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Todo } from './entities/todo.entity';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { UpdateTodoStatusDto } from './dto/update-todo-status.dto';
import { FilterTodoDto } from './dto/filter-todo.dto';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo)
    private readonly todoRepository: Repository<Todo>,
  ) {}

  /**
   * สร้าง Todo ใหม่
   */
  async create(createTodoDto: CreateTodoDto): Promise<Todo> {
    const todo = this.todoRepository.create(createTodoDto);
    return this.todoRepository.save(todo);
  }

  /**
   * ดึงรายการ Todo ทั้งหมด พร้อม Search/Filter
   */
  async findAll(filterDto: FilterTodoDto): Promise<Todo[]> {
    const { search, status } = filterDto;

    const queryBuilder = this.todoRepository.createQueryBuilder('todo');

    // Filter ตามสถานะ
    if (status) {
      queryBuilder.andWhere('todo.status = :status', { status });
    }

    // Search ใน title และ description
    if (search) {
      queryBuilder.andWhere(
        '(todo.title LIKE :search OR todo.description LIKE :search)',
        { search: `%${search}%` },
      );
    }

    // เรียงตามวันที่สร้างล่าสุดก่อน
    queryBuilder.orderBy('todo.createdAt', 'DESC');

    return queryBuilder.getMany();
  }

  /**
   * ดึง Todo ตาม ID
   */
  async findOne(id: number): Promise<Todo> {
    const todo = await this.todoRepository.findOne({ where: { id } });
    if (!todo) {
      throw new NotFoundException(`ไม่พบ Todo ที่มี ID: ${id}`);
    }
    return todo;
  }

  /**
   * แก้ไข Todo
   */
  async update(id: number, updateTodoDto: UpdateTodoDto): Promise<Todo> {
    const todo = await this.findOne(id);
    Object.assign(todo, updateTodoDto);
    return this.todoRepository.save(todo);
  }

  /**
   * เปลี่ยนสถานะ Todo
   */
  async updateStatus(
    id: number,
    updateTodoStatusDto: UpdateTodoStatusDto,
  ): Promise<Todo> {
    const todo = await this.findOne(id);
    todo.status = updateTodoStatusDto.status;
    return this.todoRepository.save(todo);
  }

  /**
   * ลบ Todo
   */
  async remove(id: number): Promise<void> {
    const todo = await this.findOne(id);
    await this.todoRepository.remove(todo);
  }
}
