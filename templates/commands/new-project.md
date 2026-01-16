# /new-project - Create a New Project

Create a new project with interactive setup for all configurations.

## Instructions

When the user runs `/new-project`, guide them through these choices using the AskUserQuestion tool for each step.

---

### Step 1: Project Type

Ask: **"What type of project do you want to create?"**

Options:
1. **Expo (React Native)** - Mobile app with Expo SDK (iOS, Android, Web)
2. **React Native CLI** - Mobile app without Expo managed workflow
3. **Next.js** - Full-stack React framework with App Router
4. **React (Vite)** - Fast single-page application
5. **React (CRA)** - Create React App (legacy)

---

### Step 2: Project Name & Location

Ask:
- **"What's your project name?"** (lowercase, hyphens allowed)
- **"Where should I create it?"** (default: `./<project-name>`)

---

### Step 3: Architecture Pattern

Based on project type, ask: **"Which architecture pattern?"**

**For Mobile (Expo/RN):**
1. **Feature-based (Recommended)** - Group by feature with colocation
   ```
   src/features/auth/{components,hooks,services,types}
   src/features/notes/{components,hooks,services,types}
   ```
2. **Layer-based** - Traditional separation by type
   ```
   src/components/
   src/hooks/
   src/services/
   ```
3. **Domain-driven** - Organize by business domain

**For Next.js:**
1. **App Router + Feature modules (Recommended)**
2. **App Router + Colocation** - Keep related files together
3. **Pages Router** - Traditional Next.js structure

**For React (Vite):**
1. **Feature-based (Recommended)**
2. **Atomic Design** - atoms/molecules/organisms/templates/pages
3. **Component-driven** - Flat component structure

---

### Step 4: TypeScript Configuration

Ask: **"TypeScript strictness level?"**

1. **Strict (Recommended)** - All strict checks enabled
2. **Standard** - Default TypeScript config
3. **Relaxed** - Minimal type checking

---

### Step 5: Styling Solution

Ask: **"How do you want to handle styling?"**

**For Mobile:**
1. **StyleSheet (Recommended)** - React Native default
2. **NativeWind** - Tailwind CSS for React Native
3. **Styled Components** - CSS-in-JS
4. **Tamagui** - Universal design system

**For Web (Next.js/React):**
1. **Tailwind CSS (Recommended)** - Utility-first CSS
2. **CSS Modules** - Scoped CSS files
3. **Styled Components** - CSS-in-JS
4. **Vanilla CSS** - Plain CSS files
5. **Sass/SCSS** - CSS preprocessor

---

### Step 6: State Management

Ask: **"Which state management solution?"**

1. **Zustand (Recommended)** - Simple, fast, minimal boilerplate
2. **TanStack Query** - Server state + caching (pair with Zustand for client state)
3. **Redux Toolkit** - Full-featured, good for complex apps
4. **Jotai** - Atomic state management
5. **Context API only** - Built-in React, good for simple apps
6. **None** - I'll add it later

---

### Step 7: Data Fetching (for Web)

Ask: **"Data fetching approach?"** (Skip for mobile with local DB)

1. **TanStack Query (Recommended)** - Caching, refetching, mutations
2. **SWR** - Stale-while-revalidate
3. **Fetch/Axios only** - Manual implementation
4. **tRPC** - End-to-end typesafe APIs (Next.js)
5. **None** - No API calls needed

---

### Step 8: Database (if applicable)

Ask: **"Do you need a database?"**

**For Mobile:**
1. **SQLite (expo-sqlite)** - Local relational database
2. **WatermelonDB** - High-performance local DB
3. **MMKV** - Fast key-value storage only
4. **None** - No local database

**For Next.js:**
1. **Prisma** - Type-safe ORM
2. **Drizzle** - Lightweight TypeScript ORM
3. **None** - No database / external API only

---

### Step 9: Authentication (optional)

Ask: **"Need authentication setup?"**

**For Mobile:**
1. **None** - I'll handle it myself
2. **Firebase Auth** - Google's auth service
3. **Supabase Auth** - Open source alternative
4. **Clerk** - Drop-in auth components

**For Next.js:**
1. **None** - I'll handle it myself
2. **NextAuth.js** - Flexible auth for Next.js
3. **Clerk** - Drop-in auth components
4. **Supabase Auth** - Open source BaaS

---

### Step 10: Testing Setup

Ask: **"Which testing setup?"**

1. **Full (Recommended)** - Unit + Integration + E2E ready
   - Jest + React Testing Library
   - E2E framework configured (Playwright/Detox)
2. **Standard** - Unit + Integration tests
   - Jest + React Testing Library
3. **Minimal** - Jest configured, no tests written
4. **Vitest** - Vite-native testing (for Vite projects)
5. **None** - No testing setup

---

### Step 11: Linting & Formatting

Ask: **"Code quality tools?"**

1. **Full (Recommended)** - ESLint + Prettier + Husky
   - Pre-commit hooks
   - Lint-staged
   - Auto-fix on save
2. **Standard** - ESLint + Prettier (no hooks)
3. **ESLint only** - Linting without formatting
4. **Biome** - Fast all-in-one linter/formatter
5. **None** - No linting setup

---

### Step 12: Additional Features

Ask: **"Select additional features:"** (multi-select)

- [ ] **Path aliases** - `@/components`, `@/utils` imports
- [ ] **Environment variables** - `.env` setup with validation
- [ ] **CI/CD** - GitHub Actions workflow
- [ ] **Docker** - Dockerfile and docker-compose
- [ ] **Storybook** - Component documentation (web)
- [ ] **i18n** - Internationalization setup
- [ ] **PWA** - Progressive Web App (Next.js/React)
- [ ] **Analytics** - Basic analytics setup
- [ ] **Error tracking** - Sentry integration

---

### Step 13: Confirmation

Show summary of all selections:

```
📦 Project Summary
─────────────────────────────────
Name:           my-awesome-app
Type:           Expo (React Native)
Architecture:   Feature-based
TypeScript:     Strict
Styling:        NativeWind
State:          Zustand
Database:       SQLite
Testing:        Full (Jest + Detox)
Linting:        Full (ESLint + Prettier + Husky)
Extras:         Path aliases, CI/CD, Environment variables
─────────────────────────────────
```

Ask: **"Create this project?"** (Yes / Modify / Cancel)

---

### Step 14: Generate Project

After confirmation:

1. **Create project directory**
2. **Initialize with template** (npx create-expo-app, etc.)
3. **Create folder structure** based on architecture
4. **Install dependencies** for selected options
5. **Configure TypeScript** with selected strictness
6. **Set up styling** solution
7. **Configure state management**
8. **Set up testing** framework
9. **Configure linting** and formatting
10. **Add selected extras**
11. **Create CLAUDE.md** with project context
12. **Initialize git** repository

---

## Output

After completion, show:

```
✅ Project created successfully!

📁 my-awesome-app/
├── src/
│   ├── features/
│   ├── components/
│   ├── hooks/
│   └── ...
├── package.json
├── tsconfig.json
├── .eslintrc.js
├── .prettierrc
└── CLAUDE.md

📋 Next steps:
   cd my-awesome-app
   npm install
   npm start

🛠️ Available scripts:
   npm start      - Start development server
   npm test       - Run tests
   npm run lint   - Check code quality
   npm run build  - Build for production
```

---

## Configuration Files to Generate

### ESLint (.eslintrc.js)
```javascript
module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'prettier'
  ],
  // ... based on project type
};
```

### Prettier (.prettierrc)
```json
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 100
}
```

### TypeScript (tsconfig.json)
```json
{
  "compilerOptions": {
    "strict": true,  // Based on selection
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  }
}
```

### Husky (pre-commit)
```bash
#!/bin/sh
npx lint-staged
```

### lint-staged (.lintstagedrc)
```json
{
  "*.{ts,tsx}": ["eslint --fix", "prettier --write"],
  "*.{json,md}": ["prettier --write"]
}
```
