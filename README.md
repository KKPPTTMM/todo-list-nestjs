# 📝 Todo List API — NestJS

REST API สำหรับจัดการรายการ Todo List สร้างด้วย **NestJS** + **TypeORM** + **SQLite**

## ✨ Features

- ✅ เพิ่ม Todo
- ✅ แก้ไข Todo
- ✅ ลบ Todo
- ✅ แสดงรายการ Todo
- ✅ เปลี่ยนสถานะ Todo (PENDING → IN_PROGRESS → DONE)
- ✅ Search / Filter (ค้นหาด้วย keyword, กรองด้วย status)
- ✅ Data Validation (ตรวจสอบข้อมูลก่อนบันทึก)
- ✅ Swagger API Documentation

## 🛠️ เทคโนโลยีที่ใช้

| เทคโนโลยี | เวอร์ชัน | หน้าที่ |
|-----------|---------|---------|
| NestJS | 11.x | Web Framework |
| TypeORM | 0.3.x | ORM สำหรับจัดการ Database |
| SQLite | 3.x | Database (ไม่ต้องติดตั้งเพิ่ม) |
| class-validator | - | Data Validation |
| Swagger | - | API Documentation |

## 📦 วิธีติดตั้ง

### 1. Clone โปรเจกต์

```bash
git clone https://github.com/<your-username>/todo-list-nestjs.git
cd todo-list-nestjs
```

### 2. ติดตั้ง Dependencies

```bash
npm install
```

### 3. รันโปรเจกต์ (Development)

```bash
npm run start:dev
```

Server จะเริ่มต้นที่ `http://localhost:3000`

### 4. เปิด Swagger UI

เข้าไปที่ `http://localhost:3000/api` เพื่อดู API Documentation และทดสอบ API

## 📡 API Endpoints

| Method | Endpoint | คำอธิบาย |
|--------|----------|----------|
| `POST` | `/todos` | สร้าง Todo ใหม่ |
| `GET` | `/todos` | ดึงรายการ Todo ทั้งหมด |
| `GET` | `/todos?search=keyword` | ค้นหา Todo ด้วย keyword |
| `GET` | `/todos?status=DONE` | กรอง Todo ตามสถานะ |
| `GET` | `/todos/:id` | ดึง Todo ตาม ID |
| `PATCH` | `/todos/:id` | แก้ไข Todo |
| `PATCH` | `/todos/:id/status` | เปลี่ยนสถานะ Todo |
| `DELETE` | `/todos/:id` | ลบ Todo |

## 📋 ตัวอย่างการใช้งาน

### สร้าง Todo ใหม่

```bash
curl -X POST http://localhost:3000/todos \
  -H "Content-Type: application/json" \
  -d '{"title": "ซื้อของที่ตลาด", "description": "ซื้อผัก ผลไม้ และเนื้อสัตว์"}'
```

**Response:**
```json
{
  "id": 1,
  "title": "ซื้อของที่ตลาด",
  "description": "ซื้อผัก ผลไม้ และเนื้อสัตว์",
  "status": "PENDING",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

### เปลี่ยนสถานะ Todo

```bash
curl -X PATCH http://localhost:3000/todos/1/status \
  -H "Content-Type: application/json" \
  -d '{"status": "DONE"}'
```

### ค้นหา Todo

```bash
curl "http://localhost:3000/todos?search=ซื้อ&status=PENDING"
```

## 📊 สถานะ Todo (TodoStatus)

| สถานะ | คำอธิบาย |
|-------|----------|
| `PENDING` | รอดำเนินการ (ค่าเริ่มต้น) |
| `IN_PROGRESS` | กำลังดำเนินการ |
| `DONE` | เสร็จสิ้น |

## 🔒 Data Validation

| Field | กฎ |
|-------|-----|
| `title` | ห้ามว่าง, ต้องเป็น string, 1-100 ตัวอักษร |
| `description` | ไม่บังคับ, ต้องเป็น string, ไม่เกิน 500 ตัวอักษร |
| `status` | ต้องเป็น PENDING, IN_PROGRESS, หรือ DONE เท่านั้น |

### ตัวอย่าง Validation Error

```bash
curl -X POST http://localhost:3000/todos \
  -H "Content-Type: application/json" \
  -d '{"title": ""}'
```

**Response (400 Bad Request):**
```json
{
  "statusCode": 400,
  "message": ["title ห้ามเป็นค่าว่าง"],
  "error": "Bad Request"
}
```

## 🚀 Deploy

### Build สำหรับ Production

```bash
npm run build
```

### รัน Production

```bash
npm run start:prod
```

### Deploy บน Render.com

1. Push โค้ดขึ้น GitHub
2. ไปที่ [render.com](https://render.com) → สร้าง Web Service ใหม่
3. เชื่อมต่อ GitHub Repository
4. ตั้งค่า:
   - **Build Command:** `npm install && npm run build`
   - **Start Command:** `node dist/main.js`
   - **Environment Variable:** `PORT=3000`
5. กด Deploy

## 📁 โครงสร้างโปรเจกต์

```
src/
├── app.module.ts              # Root module (TypeORM config)
├── main.ts                    # Entry point (Swagger, Validation)
└── todos/
    ├── todos.module.ts        # Todos module
    ├── todos.controller.ts    # REST API endpoints
    ├── todos.service.ts       # Business logic
    ├── dto/
    │   ├── create-todo.dto.ts       # สร้าง Todo (Validation)
    │   ├── update-todo.dto.ts       # แก้ไข Todo
    │   ├── update-todo-status.dto.ts # เปลี่ยนสถานะ
    │   └── filter-todo.dto.ts       # Search/Filter
    ├── entities/
    │   └── todo.entity.ts     # Todo Entity (TypeORM)
    └── enums/
        └── todo-status.enum.ts # สถานะ Todo
```

## 👨‍💻 Author

แบบทดสอบ — Artron Innovative Co, Ltd.
