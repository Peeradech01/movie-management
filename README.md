# ระบบจัดการภาพยนตร์ (Movie Management)

เว็บแอปพลิเคชันสำหรับจัดการข้อมูลภาพยนตร์ (CRUD) โปรเจคนี้พัฒนาโดยใช้ React, NestJS, PostgreSQL, Docker

---

## Tech Stack

| Layer            | Stack                                    |
| ---------------- | ---------------------------------------- |
| Frontend         | React + TypeScript + Vite + Tailwind CSS |
| State Management | MobX-State-Tree                          |
| Backend          | NestJS + TypeScript                      |
| Database         | PostgreSQL                               |
| ORM              | TypeORM                                  |
| Authentication   | JWT + Cookies + Passport.js     |
| Container        | Docker + Docker Compose                  |
| API Architecture | REST API                                 |

---

## Features

- จัดการข้อมูลภาพยนตร์ (Movie Title, Year Released
  , Rating)
- ควบคุมสิทธิ์การใช้งานตามบทบาท
    - **MANAGER** — เพิ่ม, ดู, แก้ไข, ลบ
    - **TEAMLEADER** — เพิ่ม, ดู, แก้ไข
    - **FLOORSTAFF** — เพิ่ม, ดู, แก้ไข
- ระบบล็อกอิน / ลงทะเบียน / ออกจากระบบ
- แบ่งหน้าข้อมูล (Pagination)

---

## Project Structure

```
movie-management/
├── docker-compose.yml
├── .env.example
├── backend/
│   ├── Dockerfile
│   ├── .env.example
│   └── src/
├── frontend/
│   ├── Dockerfile
│   ├── nginx.conf
│   ├── .env.example
│   └── src/
└── README.md
```

---

## การติดตั้งและใช้งาน (Docker) — วิธีที่แนะนำ

### ขั้นตอนที่ 1 — Clone โปรเจกต์

```bash
git clone https://github.com/Peeradech01/movie-management.git
cd movie-management
```

---

### ขั้นตอนที่ 2 — ตั้งค่า Environment Variables

```bash
cp .env.example .env
```

เปิดไฟล์ `.env` และแก้ไขค่าดังต่อไปนี้

```env
# ฐานข้อมูล
DB_USER=postgres
DB_PASSWORD=your_password        ← กำหนดรหัสผ่านที่ต้องการ
DB_NAME=postgres
DB_PORT=5432
DB_HOST=postgres

# JWT
JWT_SECRET=your_jwt_secret_key   ← กำหนด Secret Key ที่ปลอดภัย

# Backend
PORT=3000

# Frontend
VITE_API_URL=http://localhost:3000
FRONTEND_URL=http://localhost:5173
```

---

### ขั้นตอนที่ 3 — รัน Docker

```bash
docker-compose up --build
```

ใช้สำหรับ Build Docker Image จากไฟล์ Dockerfile และรัน Container ขึ้นมาทำงานพร้อมกันในคำสั่งเดียว เพื่อรันทั้ง Frontend, Backend และ Database

---

### ขั้นตอนที่ 4 — เปิดใช้งาน

เปิดเบราว์เซอร์แล้วไปที่ URL ด้านล่าง

| บริการ       | URL                          |
| ------------ | ---------------------------- |
| Frontend     | http://localhost:5173        |
| Backend API  | http://localhost:3000        |
| Health Check | http://localhost:3000/health |

---

## การติดตั้งและรันบนเครื่องโดยตรง (ไม่ใช้ Docker)

### Backend

```bash
cd backend

# ติดตั้ง Dependencies
npm install

# ตั้งค่า Environment
cp .env.example .env
```

แก้ไขไฟล์ `backend/.env` ดังนี้

```env
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=your_password  ← กำหนดรหัสผ่านที่ต้องการ
DB_NAME=postgres
JWT_SECRET=your_secret     ← กำหนด Secret Key ที่ปลอดภัย
PORT=3000
FRONTEND_URL=http://localhost:5173
```

```bash
# รัน Development Server
npm run start:dev
```

### Frontend

```bash
cd frontend

# ติดตั้ง Dependencies
npm install

# ตั้งค่า Environment
cp .env.example .env
```

รัน Frontend ด้วยคำสั่งนี้

```bash
# รัน Development Server
npm run dev
```

---

## Users สำหรับทดสอบ

ระบบจะสร้างบัญชีผู้ใช้ทดสอบโดยอัตโนมัติเมื่อเริ่มต้นใช้งานครั้งแรก ตามที่เขียนไว้ในไฟล์ seed.ts

| role       | username | password |
| ---------- | -------- | -------- |
| MANAGER    | manager  | 123456   |
| TEAMLEADER | leader   | 123456   |
| FLOORSTAFF | staff    | 123456   |

---

## API Endpoints

### Authentication

| Method | Endpoint       | รายละเอียด  |
| ------ | -------------- | ----------- |
| POST   | `/auth/login`  | เข้าสู่ระบบ |
| POST   | `/auth/logout` | ออกจากระบบ  |

### Movies

| Method | Endpoint                  | role                  |
| ------ | ------------------------- | --------------------- |
| GET    | `/movies?page=1&limit=10` | ทุก role              |
| POST   | `/movies`                 | ทุก role              |
| PATCH  | `/movies/:id`             | ทุก role              |
| DELETE | `/movies/:id`             | role MANAGER เท่านั้น |

### Users

| Method | Endpoint          | รายละเอียด             |
| ------ | ----------------- | ---------------------- |
| POST   | `/users/register` | ลงทะเบียนผู้ใช้ใหม่    |
| GET    | `/users/profile`  | ดูข้อมูลผู้ใช้ปัจจุบัน |

---

## วิธีแก้ไขถ้า Port ชนกัน

### กรณี Port 5432 ถูกใช้งานอยู่แล้ว

เกิดขึ้นเมื่อมี PostgreSQL ติดตั้งบนเครื่องและใช้ Port 5432 อยู่

**ขั้นตอนการแก้ไข**

1. แก้ไข `docker-compose.yml` เปลี่ยน Port ของ postgres

```yaml
postgres:
    ports:
        - "5433:5432"
```

2. แก้ไข `root/.env`

```env
DB_PORT=5433
```

3. รัน Docker ใหม่

```bash
docker-compose down
docker-compose up --build
```

---

## รายละเอียด Environment Variables

### `root/.env` สำหรับ Docker

| ตัวแปร         | รายละเอียด                                 | ตัวอย่าง                |
| -------------- | ------------------------------------------ | ----------------------- |
| `DB_USER`      | ชื่อผู้ใช้ฐานข้อมูล                        | `postgres`              |
| `DB_PASSWORD`  | รหัสผ่านฐานข้อมูล                          | `your_password`         |
| `DB_NAME`      | ชื่อฐานข้อมูล                              | `postgres`              |
| `DB_HOST`      | Host ของฐานข้อมูล (ชื่อ Service ใน Docker) | `postgres`              |
| `DB_PORT`      | Port ของฐานข้อมูล                          | `5432`                  |
| `JWT_SECRET`   | Secret Key สำหรับเข้ารหัส JWT              | `random-secret`         |
| `PORT`         | Port ของ Backend                           | `3000`                  |
| `VITE_API_URL` | URL ของ Backend สำหรับ Frontend            | `http://localhost:3000` |
| `FRONTEND_URL` | URL ของ Frontend สำหรับตั้งค่า CORS        | `http://localhost:5173` |
