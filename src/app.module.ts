import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodosModule } from './todos/todos.module';
import { Todo } from './todos/entities/todo.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'better-sqlite3',
      database: 'todo-database.sqlite',
      entities: [Todo],
      synchronize: true, // สร้างตารางอัตโนมัติ (เหมาะสำหรับ development)
    }),
    TodosModule,
  ],
})
export class AppModule {}
