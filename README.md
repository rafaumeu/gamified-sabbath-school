<div align="center">

# 🎮 Gamified Sabbath School

**Project scaffold for a gamified scoring platform for Sabbath School** — integrating students, teachers, and parents.

> ⚠️ **Early stage.** This is a Turborepo monorepo with initial scaffolding. No application features are implemented yet. See [What's Implemented](#-whats-implemented-vs-planned) for details.

[![Next.js](https://img.shields.io/badge/Next.js-14.1-000000.svg)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6.svg)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-06B6D4.svg)](https://tailwindcss.com/)
[![Turborepo](https://img.shields.io/badge/Turborepo-Latest-EF4444.svg)](https://turbo.build/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Docker-316192.svg)](https://www.postgresql.org/)

---

</div>

## 📋 Project Status

| Area | Status |
|------|--------|
| Monorepo tooling (Turborepo, TS configs) | ✅ Done |
| Next.js app scaffold | ✅ Done (placeholder page only) |
| UI component library | 🟡 Started (1 Button component) |
| Fastify backend | ❌ Empty directory (no source code) |
| Database schema (Prisma) | ❌ Not created (no `schema.prisma`) |
| Gamification features | ❌ Not started |
| User profiles (student/teacher/parent/admin) | ❌ Not started |
| Authentication | ❌ Not started |
| Tests | ❌ Not started |

## 🏗️ Architecture Plan

The intended architecture is a **Turborepo monorepo** with:

```
gamified-sabbath-school/
├── apps/
│   ├── web/                 # Next.js 14 frontend (App Router)
│   └── server/              # Fastify backend API (planned)
├── packages/
│   ├── database/            # Prisma ORM package (planned)
│   └── ui/                  # Shared React component library
├── docker-compose.yml       # PostgreSQL for local dev
└── turbo.json               # Turborepo pipeline config
```

### Current State (what actually exists)

```
gamified-sabbath-school/
├── apps/
│   ├── web/                 # Next.js 14 — has 1 placeholder page
│   │   ├── app/
│   │   │   ├── layout.tsx       # Root layout with metadata
│   │   │   ├── page.tsx         # Home page (heading + Button)
│   │   │   └── globals.css      # CSS variables for theming
│   │   ├── tailwind.config.ts   # Custom color tokens
│   │   └── package.json         # next 14, react 18, tailwind
│   └── server/              # ❌ Only tsconfig.json — no code
├── packages/
│   ├── database/            # Has PrismaClient import, but no schema
│   │   └── src/index.ts         # Exports `new PrismaClient()`
│   └── ui/                  # Shared component library
│       └── src/
│           ├── components/
│           │   ├── Button.tsx    # CVA-based button (3 variants, 3 sizes)
│           │   └── index.ts
│           ├── utils/
│           │   └── index.ts      # cn() helper (clsx + tailwind-merge)
│           ├── styles.css         # CSS variable theme tokens
│           └── index.ts
├── .github/workflows/      # CI: commit lint, PR labeler, project board, AI review
├── docker-compose.yml       # PostgreSQL container
├── turbo.json
├── tsconfig.base.json
└── tsconfig.react.json
```

## ⚡ Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| Frontend | Next.js (App Router) | 14.1 |
| Styling | Tailwind CSS | 3.4 |
| UI Components | Radix UI + CVA + clsx | — |
| Backend (planned) | Fastify | — |
| ORM (planned) | Prisma | — |
| Database | PostgreSQL | via Docker |
| Build System | Turborepo | latest |
| Language | TypeScript | 5.x |
| Package Manager | Yarn 1 (Classic) | 1.22 |

## ✅ What's Implemented vs Planned

### Implemented

- **Monorepo setup**: Turborepo with yarn workspaces, shared TS configs
- **Next.js app**: Scaffolded with App Router, Tailwind CSS, and CSS variable theming
- **UI package**: Buildable with `tsup`, includes one `Button` component with variants (primary/secondary/outline) and sizes (sm/md/lg)
- **Docker**: PostgreSQL container for local development
- **CI/CD**: 4 GitHub Actions workflows (commit message linting, PR auto-labeling, project board automation, AI code review)
- **Commit convention**: Commitlint with conventional commit config

### Planned (not yet built)

- **Fastify API server** (`apps/server`) — directory exists but contains no code
- **Prisma schema** — `packages/database` references `@prisma/client` but has no `schema.prisma`
- **Gamification engine** — scoring, levels, achievements, rankings, rewards
- **User roles** — student, teacher, parent, admin interfaces
- **Attendance system** — tracking and reporting
- **Metrics & reports** — attendance rate, engagement, study tracking
- **Authentication** — login/signup flow
- **Notifications** — real-time feedback
- **Responsive layouts** — mobile-friendly pages

## 🛠️ Setup

### Prerequisites

- Node.js 18+
- Yarn 1.x
- Docker (for PostgreSQL)

### Installation

```bash
# Clone the repository
git clone https://github.com/rafaumeu/gamified-sabbath-school.git
cd gamified-sabbath-school

# Install dependencies
yarn install

# Start PostgreSQL
docker compose up -d postgres
```

### Running the web app

```bash
# Build the UI package first (required by web app)
yarn workspace @sabbath-school/ui build

# Start the Next.js dev server
yarn workspace @sabbath-school/web dev
```

The web app will be available at `http://localhost:3000`.

> **Note:** The Fastify server (`apps/server`) cannot be started — it has no source code or package.json yet. Prisma commands won't work because no schema exists.

## 📝 Commit Convention

This project uses [Conventional Commits](https://www.conventionalcommits.org/) enforced by Commitlint:

```
<type>(<scope>): <description>
```

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`, `revert`

---

<div align="center">
Made with ❤️ by Rafael Dias Zendron

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/rafael-dias-zendron-528290132/)
[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/rafaumeu)
</div>
