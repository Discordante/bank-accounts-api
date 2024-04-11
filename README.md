![GitHub repo size](https://img.shields.io/github/repo-size/Discordante/bank-accounts-api)

# Bank API

## Technologies Used
- **NestJS**

  - [NestJS](https://nestjs.com/) is a powerful Node.js framework for building scalable and maintainable server-side applications.
  - It provides features like dependency injection, decorators, and a modular architecture, making it an excellent choice for creating APIs and web applications.

- **Prisma**

  - [Prisma](https://www.prisma.io/) is an intuitive ORM (Object-Relational Mapping) for TypeScript and JavaScript.
  - It simplifies database operations and management, including schema creation, querying, and migrations.
  - Prisma streamlines database interactions, making it easier to work with databases in your application.

- **PostgreSQL**
  - [PostgreSQL](https://www.postgresql.org/) is a robust, open-source relational database management system.
  - It is known for its exceptional performance and reliability.
  - PostgreSQL is a popular choice for handling structured data in applications and offers features like ACID compliance and extensibility.

These technologies, when combined, provide a solid foundation for building efficient, maintainable, and feature-rich applications.

## API Documentation

The project is deployed in a free instance, so the first time you access it, it will take some time to get up. You must be patient and wait a couple of minutes.

For a detailed description of the API, including routes, parameters, and expected responses, please visit my [API documentation](https://bank-accounts-api.onrender.com/api/v1/docs).

This documentation is designed to be easy to navigate, helping you to quickly and effectively integrate with our API.


## Installation

```bash
npm install
```

## Prisma

### Code Generation

To generate TypeScript code corresponding to your data model in Prisma, use the following command:

```bash
npx prisma generate
```

### Database Migrations

It is important to make these changes pointing to the localhost dbdd, to avoid possible errors.
Database migrations are crucial for maintaining the integrity of your database as your application evolves. To create a migration without applying it, use the following command:

```bash
npx prisma migrate dev --create-only
```

This command will generate a migration file in the prisma/migrations folder without applying the migration to the database.
When uploading the branch, the database changes specified in the migration will be applied.

## Running the app

```bash
# development
npm run start

# watch mode
npm run start:dev

# production mode
npm run start:prod
```

## Test

```bash
# unit tests
npm run test

# e2e tests
npm run test:e2e

# test coverage
npm run test:cov
```# food-api-rest