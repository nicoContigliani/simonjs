# Simón

This project is a Hapi.js-based API with TypeORM for database management, Swagger for API documentation, and various other features.

## Table of Contents

- [Simón](#simón)
  - [Table of Contents](#table-of-contents)
  - [Installation](#installation)
  - [Scripts](#scripts)

## Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install

3. Set up your environment variables (including `JWT_SECRET`)
4. Initialize the database (make sure your database connection is configured in `ormconfig.ts`)

To start the server in development mode:

```shellscript
npm run dev
```

The server will start on `http://localhost:3000` (unless configured otherwise).

API documentation will be available at `http://localhost:3000/documentation`.

## Scripts

- `start`: Start the production server
- `dev`: Start the development server with hot-reloading
- `migration:run`: Run database migrations
- `migration:revert`: Revert the last database migration
- `migration:generate`: Generate a new migration
- `typeorm`: Run TypeORM CLI commands
- `test`: Run all tests
- `test:unit`: Run unit tests
- `test:integration`: Run integration tests
- `test:coverage`: Run tests with coverage report

.env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=*****
DB_PASSWORD=**********
DB_NAME=********
JWT_SECRET=******
ENVIRIOMENTS=********