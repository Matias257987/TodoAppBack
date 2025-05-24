# ToDo Backend (Node.js + TypeScript + Prisma + Supabase)

## 🚀 Instrucciones

### 1. Instalar dependencias
```bash
npm install
```

### 2. Configurar el archivo .env
Editá `.env` con tus datos de conexión de Supabase.

### 3. Inicializar Prisma
```bash
npx prisma generate
npx prisma migrate dev --name init
```

### 4. Levantar el servidor
```bash
npm run dev
```

## 📦 Endpoints

### Auth
- `POST /auth/register`
- `POST /auth/login` → devuelve JWT

### Tasks (requiere JWT en `Authorization: Bearer <token>`)
- `GET /tasks`
- `POST /tasks`
- `PUT /tasks/:id`
- `DELETE /tasks/:id`

---
