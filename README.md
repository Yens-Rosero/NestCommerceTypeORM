# 📚 NestJS TypeORM E-Commerce API 🚀

This project is a **NestJS** application using **PostgreSQL** with **TypeORM**. The modularized structure and implemented relationships follow best practices of single responsibility and clean architecture, ensuring scalability and efficient code maintenance.

---

## 📖 Project Description

This NestJS application is designed to offer:

- 📦 **Efficient Modularization** for scalable architecture
- 🔗 **PostgreSQL Connection** using TypeORM
- **One-to-One and One-to-Many Entity Relationships**
- Concrete examples of connecting and configuring services using **UseFactory**
- Implementation of single responsibility and clean architecture best practices in NestJS
- 🔐 **JWT Authentication** with role-based access control
- 📝 **Complete Swagger Documentation**

---

## 🔍 Main Features

### TypeORM Usage
- Connect your project to PostgreSQL quickly and efficiently
- Implement relationships:
  - **One-to-One Relationship** (e.g. User ↔ Customer)
  - **One-to-Many Relationship** (e.g. Order ↔ OrderItems)
  - **Many-to-One Relationship** (e.g. OrderItem ↔ Product)

### Modularization
- The modularized structure allows adding and scaling functionalities without losing project organization
- Clear separation of concerns between modules

### Single Responsibility (SRP)
- Each file and class follows the single responsibility principle
- Facilitates maintenance and future updates

---

## 🛠 Technologies

- **Framework:** NestJS
- **Database:** PostgreSQL
- **ORM:** TypeORM
- **Documentation:** Swagger/OpenAPI
- **Authentication:** JWT
- **Environment Management:** Configuration with `@nestjs/config`
- **Testing:** Jest
- **Validation:** class-validator
- **API Documentation:** Swagger\
  
---

## 🔄 Database Migrations

This project uses TypeORM for database migrations, allowing you to manage and version your database schema changes efficiently.

### Migration Commands

The following commands are available in the `package.json` to handle migrations:

- **Generate a new migration**: Create a new migration file based on the changes in your entities.
  ```bash
  npm run migrations:generate -- <MigrationName>
  ```

- **Run migrations**: Apply all pending migrations to the database.
  ```bash
  npm run migrations:run
  ```

- **Show migrations**: List all migrations and their status.
  ```bash
  npm run migrations:show
  ```

- **Revert migrations**: Rollback the last applied migration.
  ```bash
  npm run migrations:revert
  ```

- **Drop schema**: Drop the entire database schema.
  ```bash
  npm run migrations:drop
  ```

These commands help ensure that your database schema is always in sync with your application code, making it easier to manage changes over time.

---
