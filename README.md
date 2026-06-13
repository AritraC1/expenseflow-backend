# ExpenseFlow

Backend REST API for expense tracking, built with **Node.js**, **Express**, **TypeScript**, and **MongoDB**.

This service supports user registration, login, expense creation, expense retrieval, expense updates, and expense deletion. It also includes scaffolded admin routes and Swagger API documentation.

---

## Key Features

* JWT-based authentication using cookies
* Password hashing with bcrypt
* Expense CRUD operations
* MongoDB persistence with Mongoose
* Health and database status endpoints
* Swagger documentation available at `/api-docs`
* Rate limiting enabled via `express-rate-limit`

---

## Tech Stack

* Node.js
* Express
* TypeScript
* MongoDB
* Mongoose
* bcryptjs
* jsonwebtoken
* swagger-jsdoc / swagger-ui-express
* express-rate-limit

---

## Project Structure

```bash
src
├── config
│   ├── db.ts
│   ├── env.ts
│   └── rateLimiter.ts
├── controllers
│   ├── admin.controller.ts
│   ├── auth.controller.ts
│   └── expense.controller.ts
├── docs
│   └── swagger.ts
├── interfaces
│   ├── payload.ts
│   └── user.ts
├── middlewares
│   └── auth.ts
├── models
│   ├── expense.model.ts
│   ├── refreshToken.model.ts
│   └── user.model.ts
├── repository
│   ├── expense.repo.ts
│   ├── refreshToken.repo.ts
│   └── user.repo.ts
├── routes
│   ├── admin.routes.ts
│   ├── all.routes.ts
│   ├── auth.routes.ts
│   ├── expense.routes.ts
│   └── health.routes.ts
├── services
├── types
│   └── express.d.ts
├── utils
│   └── jwt.ts
└── index.ts
```

---

## Environment Variables

Create a `.env` file with the following variables:

```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/expenseflow
MONGO_INITDB_ROOT_USERNAME=admin
MONGO_INITDB_ROOT_PASSWORD=password
MONGO_INITDB_DATABASE=expenseflow
JWT_SECRET_KEY=your_super_secret_key
```

> Note: `src/config/env.ts` currently requires `MONGO_INITDB_ROOT_USERNAME`, `MONGO_INITDB_ROOT_PASSWORD`, and `MONGO_INITDB_DATABASE` in addition to `MONGO_URI` and `JWT_SECRET_KEY`.

---

## Scripts

```json
{
  "scripts": {
    "test": "jest",
    "dev": "ts-node-dev --respawn src/index.ts",
    "build": "tsc",
    "start": "node dist/index.js"
  }
}
```

---

## Running the App

Install dependencies:

```bash
npm install
```

Run locally in development mode:

```bash
npm run dev
```

Build the project:

```bash
npm run build
```

Start the compiled app:

```bash
npm start
```

---

## API Base URL

All API endpoints are mounted under:

```text
/api/v1
```

Swagger UI is available at:

```text
/api-docs
```

---

## Authentication

Authentication is handled with JWTs stored in cookies:

* `accessToken` cookie for access
* `refreshToken` cookie for refresh

The app uses `cookie-parser` to read these cookies.

---

## Endpoints

### Health

#### Check server status

```http
GET /api/v1/health
```

#### Check MongoDB connection status

```http
GET /api/v1/health/db-health
```

### Auth

#### Register

```http
POST /api/v1/auth/register
```

Body:

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "Password123"
}
```

#### Login

```http
POST /api/v1/auth/login
```

Body:

```json
{
  "email": "john@example.com",
  "password": "Password123"
}
```

Successful login sets `accessToken` and `refreshToken` cookies and returns the access token in the response.

#### Refresh JWT

```http
POST /api/v1/auth/refresh-jwt
```

Requires `refreshToken` cookie.

#### Logout

```http
POST /api/v1/auth/logout
```

Clears `accessToken` and `refreshToken` cookies and revokes the stored refresh token.

### Expenses

#### Create expense

```http
POST /api/v1/expenses/new
```

Body:

```json
{
  "title": "Groceries",
  "amount": 1200,
  "category": "Food"
}
```

#### Get my expenses

```http
GET /api/v1/expenses/my
```

#### Update expense

```http
PATCH /api/v1/expenses/update/:id
```

#### Delete expense

```http
DELETE /api/v1/expenses/delete/:id
```

### Admin

#### Get all users

```http
GET /api/v1/admin/users
```

#### Get all expenses

```http
GET /api/v1/admin/expenses
```

> Note: `src/controllers/admin.controller.ts` currently contains placeholder handlers and does not implement response logic.

---

## Data Models

### User

```json
{
  "_id": "ObjectId",
  "name": "John Doe",
  "email": "john@example.com",
  "password": "hashedPassword",
  "role": "user"
}
```

### Expense

```json
{
  "_id": "ObjectId",
  "user_id": "ObjectId",
  "title": "Pizza",
  "amount": 500,
  "category": "Food",
  "createdAt": "2026-08-01T10:00:00Z"
}
```

---

## Notes

* The repository includes a `src/middlewares/auth.ts` middleware for JWT authentication via cookies.
* Role-based access control is not currently enforced in the route layer.
* Swagger definitions are generated from route JSDoc comments in `src/routes/*.ts`.

---

## Future Improvements

* Implement admin route handlers
* Add role-based route protection
* Add request validation and error handling middleware
* Expand test coverage
