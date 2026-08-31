<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

<h1 align="center">NestJS Clean Architecture & DDD Microservice</h1>
<p align="center">
  A strict, high-performance, and scalable Auth & 2FA microservice built on <b>Domain-Driven Design (DDD)</b>, <b>Clean Architecture</b>, and <b>SOLID</b> principles.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white" alt="NestJS" />
  <img src="https://img.shields.io/badge/Swagger-85EA2D?style=for-the-badge&logo=swagger&logoColor=black" alt="Swagger" />
  <img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white" alt="Docker" />
  <img src="https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge" alt="License" />
</p>

---

## 🎯 Why this reposytori?

Most 4k-star boilerplates on the web have turned into "dependency dumps" — mixing ORM logic with the domain, relying on fat controllers, and tightly coupling your codebase to a specific database from day one.

This repository demonstrates **clean separation of concerns**: core domain logic remains completely isolated from the framework and infrastructure.

| Criteria              | Typical Boilerplates (4k★)                    | This Repository (Clean DDD)                              |
| :-------------------- | :-------------------------------------------- | :------------------------------------------------------- |
| **Architecture**      | FAT Controllers + Anemic Domain Model         | Strict DDD (Entities, Value Objects, Isolated Use Cases) |
| **Principles**        | Frequent SRP & DIP Violations                 | Strict Adherence to SOLID, SRP, DIP                      |
| **Dependencies**      | Tightly coupled Mongoose + TypeORM + Mongo    | Inverted via Interfaces (DIP Driven)                     |
| **Database Coupling** | Hardwired ORM dependencies inside Domain      | In-Memory / Plug-and-Play DB (Zero Domain Impact)        |
| **Data Validation**   | Domain polluted with primitive `string` types | Strict **Value Objects** (`EmailVO`, `PasswordVO`)       |

---

## Project Architecture

The code is divided into isolated layers according to Clean Architecture:

```text
src/auth/
├── application/         # Atomic business workflows (Use Cases & Mappers)
│   ├── mappers/         # Data transformation (Domain Entity ➔ Response DTO)
│   └── use-cases/       # Isolated business actions (SRP — single use-case per file)
├── controllers/         # REST API layer (NestJS Controllers, DTOs, Swagger specs)
├── domain/              # Core business logic (Zero Framework Dependencies)
│   ├── constants/       # Domain-specific constants & error codes
│   ├── entities/        # Core domain entities (e.g., User)
│   ├── interfaces/      # Core contracts & type definitions
│   ├── repositories/    # Repository abstractions & interfaces (DIP)
│   └── value-objects/   # Domain invariants & validation rules (Email, Password, TOTP)
└── infrastructure/      # External adapters & drivers (Database, Mailers, APIs)
    └── database/        # In-Memory & PostgreSQL repository implementations
```

### Key Architectural Highlights

- **Zero-Pollution Domain:** Core domain has zero dependencies on NestJS, Express, or any ORM.
- **Value Objects:** Invariants and data validation are strictly enforced at creation time.
- **Atomic Use Cases:** Single Responsibility Principle applied — each use-case handles exactly one business action.
- **Dependency Inversion (DIP):** Application and Domain layers depend strictly on abstractions (interfaces), never on concrete implementations.

---

## 🚀 Features

- [x] **User Registration:** Complete sign-up flow backed by Value Object validation.
- [x] **Two-Factor Authentication (2FA / TOTP):** Secret generation and real-time token verification.
- [x] **In-Memory Repository:** Zero-config setup for rapid execution and out-of-the-box unit testing.
- [x] **OpenAPI / Swagger:** Fully automated interactive API documentation.
- [x] **Production Ready:** Optimized Docker containerization ready for Cloud Run / ECS deployment.

## 🛠 Quick Start

### 1. Clone the repository and install dependencies

```bash
git clone https://github.com/your-username/nestjs-clean-ddd-auth.git
cd nestjs-clean-ddd-auth
npm install
```

### 2. Run in development mode

```bash
npm run start:dev
```

Once started, the Swagger UI will be available at: http://localhost:3000/api

### 3. Testing

```bash
# Unit tests
npm run test

# End-to-end (e2e) tests
npm run test:e2e
```

---

## ⭐️ Support the Project

If you are tired of chaotic boilerplates and value clean, scalable code built on SOLID and DDD principles — give this repository a **Star ⭐️**! Your support helps promote high-quality architectural standards across the NestJS ecosystem.

---

## 📜 License

This project is licensed under the [MIT License](LICENSE).
