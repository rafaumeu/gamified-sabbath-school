<div align="center">

# 🎮 Gamified Sabbath School

A gamified scoring platform for Sabbath School, integrating students, teachers, and parents.

[![Next.js](https://img.shields.io/badge/Next.js-13-000000.svg)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6.svg)](https://www.typescriptlang.org/)
[![Fastify](https://img.shields.io/badge/Fastify-Latest-202020.svg)](https://www.fastify.io/)
[![Prisma](https://img.shields.io/badge/Prisma-Latest-2D3748.svg)](https://www.prisma.io/)
[![Swagger](https://img.shields.io/badge/Swagger-Latest-85EA2D.svg)](https://swagger.io/)

---

## 📖 Table of Contents

| [Tech Stack](#-tech-stack) | [Features](#-features) | [Setup](#️-setup) |
|---------------------------|------------------------|------------------|
| [Project Structure](#️-project-structure) | [Deployment](#-deployment) | [Contact](#-contact) |

---

### ⚡ Tech Stack

![Next.js](https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Fastify](https://img.shields.io/badge/fastify-202020?style=for-the-badge&logo=fastify&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)

---
</div>

## 🚀 Features

- **Gamification System**:
  - Progressive scoring
  - Levels and achievements
  - Rankings and rewards
  - Attendance system

- **Multiple Profiles**:
  - Student interface
  - Teacher dashboard
  - Parent area
  - Admin panel

- **Metrics and Reports**:
  - Attendance rate
  - Group engagement
  - Daily study
  - Missionary activities

- **User Experience**:
  - Responsive design
  - Intuitive interface
  - Notifications
  - Real-time feedback

## 📦 Prerequisites

- Node.js 18+
- PostgreSQL
- npm or yarn
- TypeScript-supported editor

## 🛠️ Setup

1. Clone the repository:

```bash
git clone https://github.com/rafaumeu/sabbath-school-gamified.git
cd sabbath-school-gamified
```

2. Install dependencies:

```bash
yarn install
```

3. Set up environment variables:

```bash
cp .env.example .env
```

4. Run migrations:

```bash
yarn prisma migrate dev
```

5. Start development server:

```bash
yarn dev
```

## 🏗️ Project Structure

```
├── apps/
│   ├── web/              # Next.js Frontend
│   │   ├── components/   # React components
│   │   ├── pages/       # Application pages
│   │   └── styles/      # Styles and themes
│   └── server/          # Fastify Backend
│       ├── controllers/ # Controllers
│       ├── routes/     # API routes
│       └── schemas/    # Swagger schemas
├── packages/
│   ├── database/       # Prisma configuration
│   └── shared/        # Shared code
└── docker-compose.yml  # Docker configuration
```

## 📝 Commit Convention

We follow the conventional commits specification:

```
<type>(<scope>): <description>

[optional body]

[optional footer(s)]
```

### Types

- feat: A new feature
- fix: A bug fix
- docs: Documentation changes
- style: Changes that don't affect code
- refactor: Code refactoring
- perf: Performance improvements
- test: Adding or fixing tests
- build: Build system changes
- ci: CI configuration changes
- chore: Other changes
- revert: Reverts a previous commit

## 🚀 Deployment

[Deployment information will be added]

---

<div align="center">
Made with ❤️ by Rafael Dias Zendron
</div>
<div align="center">
<img src="https://github.com/rafaumeu.png" width="100" height="100" style="border-radius: 50%;">

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/rafael-dias-zendron-528290132/)
[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/rafaumeu)
</div>
