# ExpenseFlow

ExpenseFlow is a role-based Expense Management REST API built with **Node.js**, **Express.js**, **TypeScript**, and **MongoDB**.

The application allows users to manage their expenses while administrators can access system-wide analytics and management features.

## Features

* JWT Authentication
* Role-Based Access Control (Admin/User)
* Expense CRUD Operations
* MongoDB Aggregation Pipelines
* Rate Limiting
* Swagger API Documentation
* Docker Support
* Docker Compose Setup
* Pagination & Filtering
* Secure Password Hashing with bcrypt

## Tech Stack

* Node.js
* Express.js
* TypeScript
* MongoDB
* Mongoose
* JWT
* bcrypt
* Swagger
* Docker
* Docker Compose

## Analytics

Implemented MongoDB Aggregation Pipelines for:

* Total Expense by Category
* Top Spending Users
* Average Expense Amount
* Monthly Expense Reports

## Getting Started

### Install Dependencies

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

### Build Project

```bash
npm run build
```

### Start Production Build

```bash
npm start
```

## Run with Docker

```bash
docker compose up --build -d
```

## API Documentation

Swagger documentation is available at:

```text
http://localhost:3000/api-docs
```

---