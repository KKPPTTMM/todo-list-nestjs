import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // เปิดใช้งาน CORS (สำหรับ Frontend เรียกใช้ API)
  app.enableCors();

  // เปิดใช้งาน Global Validation Pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,           // ตัด field ที่ไม่ได้กำหนดใน DTO ออก
      forbidNonWhitelisted: true, // ส่ง error ถ้ามี field ที่ไม่ได้กำหนด
      transform: true,           // แปลงค่า query/param ให้ตรงกับ type ที่กำหนด
    }),
  );

  // ตั้งค่า Swagger
  const config = new DocumentBuilder()
    .setTitle('Todo List API')
    .setDescription(
      'REST API สำหรับจัดการ Todo List — สร้างด้วย NestJS, TypeORM, SQLite',
    )
    .setVersion('1.0')
    .addTag('Todos', 'จัดการรายการ Todo')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const port = process.env.PORT || 3000;
  await app.listen(port);

  console.log(`🚀 Server is running on: http://localhost:${port}`);
  console.log(`📖 Swagger UI: http://localhost:${port}/api`);
}
bootstrap();
