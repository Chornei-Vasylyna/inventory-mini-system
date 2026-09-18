 # Inventory Mini System

 ## How to Run

From the project root, run:

 ```bash
 docker compose up --build
 ```

 Open the application in your browser at [http://localhost:3000](http://localhost:3000).

 The application uses these services:

 - Frontend: [http://localhost:3000](http://localhost:3000)
 - Backend API: [http://localhost:4000](http://localhost:4000)
 - PostgreSQL: `localhost:5432`

 The backend applies committed Prisma migrations when its container starts. PostgreSQL data is stored in the `postgres_data` Docker volume.

 ### Local Development

 The Docker setup is the recommended way to run the whole project. To run services separately, install Node.js 22+ and pnpm, start PostgreSQL, and set the backend `DATABASE_URL` to a PostgreSQL database.

 Backend:

 ```bash
 cd backend
 pnpm install
 pnpm db:generate
 pnpm db:migrate:deploy
 pnpm start:dev
 ```

 Frontend, in a second terminal:

 ```bash
 cd frontend
 pnpm install
 pnpm dev
 ```

 The frontend uses `http://localhost:4000` by default. Set `VITE_API_URL` when the API is hosted elsewhere.

 ## Technologies Used

 - Frontend: React 19, TypeScript, Vite, React Router (Data Mode), TanStack Query, React Hook Form, Zod, Axios, Tailwind CSS
 - Backend: Node.js 22, NestJS, TypeScript, class-validator
 - Database: PostgreSQL 16
 - ORM and migrations: Prisma 7
 - Deployment: Docker Compose and Nginx

 ## What Is Completed

 - Product list with loading and error states
 - Add product form
 - Edit product form
 - Delete product
 - Product quantity changes through create/edit flows
 - Quantity-based product status display
 - Optional product description
 - REST API with validation and not-found handling
 - PostgreSQL persistence with Prisma migrations
 - Docker Compose setup for frontend, backend, and database

 ## What Is Not Completed

- All required core features have been implemented.

 ## API Endpoints

 Base URL: `http://localhost:4000`

 | Method | Endpoint | Description |
 | --- | --- | --- |
 | `GET` | `/products` | Return all products, newest first |
 | `GET` | `/products/:id` | Return one product |
 | `POST` | `/products` | Create a product |
 | `PATCH` | `/products/:id` | Update one or more product fields |
 | `DELETE` | `/products/:id` | Delete a product |

 ## Database

 PostgreSQL stores products in the `products` table. Each product contains:

 - `id`
 - `name`
 - `quantity`
 - `price`
 - `status`
 - `description` (optional)
 - `created_at`
 - `updated_at` (optional)

 The default Docker connection string is:

 ```text
 postgresql://postgres:postgres@postgres:5432/inventory_db
 ```

 ## Docker Description

 `docker-compose.yml` defines three services:

 - `frontend`: builds the Vite application and serves it with Nginx on port `3000`
 - `backend`: builds the NestJS API, runs Prisma migrations, and listens on port `4000`
 - `postgres`: runs PostgreSQL 16 on port `5432` and persists data in `postgres_data`

 The backend depends on PostgreSQL, and the frontend depends on the backend.

 ## AI Usage Report

AI tool used:
- GitHub Copilot

What I used AI for:
- I used AI mainly to skip tedious, repetitive tasks that I have done many times before. For example, since I have set up routing dozens of times, instead of manually writing the same basic boilerplate structure from scratch, I had Copilot generate it, and then I just tweaked it to fit my project needs. It helped me quickly scaffold standard CRUD endpoints, write initial routing setups, create basic UI styles, and generate TypeScript types.

I also used it to keep my code style consistent and clean:
- Converting syntax to my preferred style, such as changing regular function declarations to arrow functions and switching to named exports instead of default ones.
- Splitting already-written UI code and larger views into smaller, dedicated components to keep the file structure modular and readable.

2–3 example prompts:
- "Сreate a form which creates a product. The user must fill out the name, quantity and price. And description as optional field.
1. Create zod validation for these fields.
2. Wire the zod with the form from react hook form.
3. Сreate the form itself.
4. The design can be simple. Focus on logic more."
- "Replace function declaration with arrow functions, and make the named exports not default"
- "Create these endpoints  
GET /products  
POST /products  
PATCH /products/:id  
DELETE /products/:id  
GET /products/:id"

What I changed manually:
- I set up the overall project architecture, folder structure, and environment configurations myself. While Copilot generated the boilerplate for files and endpoints, I reviewed the code, fixed broken parts, resolved type mismatches, and connected all the frontend and backend parts together so the whole application runs properly.

What was difficult:
- The difficult part was setting up Docker. I ran into several issues with Prisma inside the container: generating the Prisma client properly, handling the generated folder, and making sure the Docker services started in the right order so migrations wouldn't fail and the database tables were actually created before the app started.