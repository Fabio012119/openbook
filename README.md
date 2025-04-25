# Openbook

**Openbook** is is an open-source full-stack, monorepo-based booking system designed for entertainment businesses (e.g. escape rooms, VR arcades, workshops). It includes a modern web frontend, a secure backend API, a PostgreSQL database schema, and integrated Stripe support for payments. In the front-end it will have an admin dashboard in which the user can add types of activities

---

## 🧱 Tech Stack

- **Frontend**: [Next.js](https://nextjs.org/) + TypeScript + Tailwind CSS
- **Backend**: [NestJS](https://nestjs.com/) + TypeScript
- **Database**: PostgreSQL + Prisma ORM
- **Auth**: JWT-based authentication (coming soon)
- **Payments**: Stripe integration (planned)

---

## 📁 Project Structure

```
openbook/
├── apps/
│   ├── frontend/             # Next.js frontend app (TypeScript + Tailwind)
│   └── backend/              # NestJS backend app
│       └── modules/          # Feature-based modules (rooms, bookings, etc.)
├── prisma/                   # Prisma schema and migration files
├── .env.example              # Sample environment variables
├── docker-compose.yml        # Local PostgreSQL setup (optional)
├── package.json              # Root script runner (monorepo workspace)
├── tsconfig.base.json        # Shared TypeScript config
└── README.md                 # This file
```

---

## 🛠️ Getting Started

### 1. Clone and Install Dependencies

```bash
cd openbook
npm install
```

### 2. Set Up Environment Variables

Copy `.env.example` and update values:

```bash
cp .env.example .env
```

```
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/openbook
```

If you're using Stripe or other services, add those as needed.

---

### 3. Run PostgreSQL (optional with Docker)

```bash
docker-compose up -d
```

Or install Docker extension in your database.
Or run PostgreSQL via Laragon if you prefer.

---

### 4. Setup Database with Prisma

```bash
npx prisma migrate dev --name init
npm run seed
```

This creates tables and populates sample data.

---

### 5. Run Frontend & Backend

#### Start Backend (NestJS)

```bash
npm run dev:be
```

BE runs on : `http://localhost:3005`

#### Start Frontend (Next.js)

```bash
npm run dev:fe
```

FE runs on : `http://localhost:3000`

---

## 🚧 Roadmap

- [x] Prisma DB schema
- [x] Seed script
- [x] Rooms API module
- [ ] Auth module (JWT)
- [ ] Booking logic
- [ ] Stripe integration
- [ ] Admin dashboard UI
- [ ] Embeddable front-end widgets UI

---

## 📄 License

MIT. Feel free to use, modify, or contribute!

If you want to contribute please reach out me at to fabiooosara@gmail.com
