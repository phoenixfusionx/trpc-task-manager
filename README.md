# tRPC Task Manager – Full-Stack Project Starter

<p align="center">
  <img src="./public/logo.png" alt="Task Manager Logo" height="200"/>
</p>

A modern and type-safe full-stack task management application built with **tRPC**, **React**, **TypeScript**, **Tailwind CSS**, and **Supabase**.

This project offers a powerful starting point for developers looking to build scalable applications with real-time updates, PostgreSQL storage, and type-safe APIs from end to end.

> **Note:** This project uses Vite, tRPC, Supabase, and Express to create a beautiful and mobile-friendly interface with a robust backend. Includes task priorities, due dates, and real-time updates.

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- A [Supabase](https://supabase.com) account and project
- npm (v8+)

### 1. Clone the Repository

```bash
git clone https://github.com/phoenixfusionx/trpc-task-manager.git
cd trpc-task-manager
```

### 2. Install Dependencies

```bash
# Install root dependencies
npm install

# Install frontend dependencies
cd client && npm install

# Install backend dependencies
cd ../server && npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the `server/` directory:

```env
SUPABASE_URL=your_supabase_project_url
SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Set Up the Database

1. Open your Supabase dashboard
2. Go to **SQL Editor**
3. Copy and run the SQL from:  
   `supabase/migrations/create_tasks_table.sql`

This will create the `tasks` table and insert some sample data.

### 5. Run the Development Server

From the root directory:

```bash
npm run dev
```

This starts:

- **Client** on [http://localhost:5173](http://localhost:5173)
- **Server** on [http://localhost:3001](http://localhost:3001)

## Project Structure

```
.
├── client/                 # Frontend (React + tRPC)
│   └── src/
│       ├── components/     # React components
│       ├── utils/          # tRPC client setup
│       └── main.tsx        # Entry point
├── server/                 # Backend (Node.js + tRPC + Express)
│   └── src/
│       ├── lib/            # Supabase client
│       ├── router.ts       # tRPC router
│       └── server.ts       # Express server
├── supabase/               # Database migrations
│   └── migrations/
└── package.json            # Root-level package.json
```

## API Endpoints (tRPC Procedures)

| Procedure    | Description                   |
| ------------ | ----------------------------- |
| `getTasks`   | Get all tasks                 |
| `getTask`    | Get a single task by ID       |
| `createTask` | Create a new task             |
| `updateTask` | Update an existing task       |
| `deleteTask` | Delete a task                 |
| `toggleTask` | Toggle task completion status |

## Database Schema (`tasks` table)

| Column        | Type      | Description          |
| ------------- | --------- | -------------------- |
| `id`          | UUID      | Primary key          |
| `title`       | Text      | Required task title  |
| `description` | Text      | Task description     |
| `completed`   | Boolean   | Completion status    |
| `priority`    | Enum      | low, medium, high    |
| `due_date`    | Timestamp | Optional due date    |
| `created_at`  | Timestamp | Auto-set on creation |
| `updated_at`  | Timestamp | Auto-set on update   |

## Scripts

| Command         | Description                         |
| --------------- | ----------------------------------- |
| `npm run dev`   | Run both frontend and backend       |
| `npm run build` | Build production assets             |
| `npm start`     | Start the server in production mode |

## Deployment

### Frontend (Vercel/Netlify)

```bash
cd client && npm run build
```

Deploy the `client/dist` folder.

### Backend (Render/Railway)

```bash
cd server && npm run build && npm start
```

Add environment variables on your platform:

- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`

## Contribution Guide

1. Fork this repo
2. Create a new feature branch (`git checkout -b feature/my-feature`)
3. Commit your changes (`git commit -m 'feat: add my feature'`)
4. Push to the branch (`git push origin feature/my-feature`)
5. Open a pull request

## Acknowledgements

- [tRPC](https://trpc.io/)
- [React](https://reactjs.org/)
- [Supabase](https://supabase.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Zod](https://github.com/colinhacks/zod)

## Author

Developed and maintained by [PhoenixFusionX](https://github.com/phoenixfusionx). For questions or contributions, please open an issue or submit a pull request.

## License

This project is open source and available under the [MIT License](LICENSE).
