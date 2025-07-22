# Express.js CRUD API with TypeScript and TypeORM

A RESTful API built with Express.js, TypeScript, and TypeORM for managing user resources with full CRUD operations.

## Prerequisites

- Node.js (v20 or higher)
- npm or yarn package manager

## Installation


1. Install dependencies:
```bash
yarn install
```

2. Create the data directory:
```bash
mkdir data
```

## Running the Application

### Development Mode
```bash
yarn dev
```
This starts the server with hot-reload using ts-node-dev.

### Production Mode
```bash
yarn build
yarn start
```
This compiles TypeScript to JavaScript and runs the compiled version.

The server will start on `http://localhost:3000` (or your specified PORT).

## Project Structure

```
src/
├── controllers/     # Request handlers
├── database/        # Database configuration and TypeORM setup
├── dto/             # Data Transfer Objects and validation
├── entities/        # TypeORM entities
├── middlewares/     # Custom middleware (validation, etc.)
├── repositories/    # Data access layer
├── services/        # Business logic layer
└── index.ts        # Application entry point
```

### Database Configuration
TypeORM is configured in `src/database/data-source.ts`:
- SQLite database for simplicity
- Automatic synchronization in development
- Migration support for production

## TypeORM Commands

### Generate Migration
```bash
yarn migration:generate -- src/migrations/CreateUserTable
```

### Run Migrations
```bash
yarn migration:run
```

### Revert Migration
```bash
yarn migration:revert
```

## License

MIT License