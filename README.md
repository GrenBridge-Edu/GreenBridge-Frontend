# Workcity Africa Frontend

Frontend application for Workcity Africa built with **Vite**, **React**, and **TypeScript**.

## 🚀 Features

- **Authentication**: Authentication Management
- **Project Module**: CRUD Project interaction
- **User Module**: CRUD User interaction (for admin)

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** v22+ (recommended v24.x.x)
- **pnpm**, **npm**, or **yarn** installed globally
- **Git**

## 🔧 Installation

1. **Clone the repository**

Clone the repository and install dependencies:

```bash
git clone <repository-url>
cd workcity-assessment-frontend
```

2. **Install dependencies**

```bash
pnpm install
# or
npm install
# or
yarn install
```

## Environment Variables

Create a .env file in the root directory with the following variables (example):

```bash
VITE_BASE_URL=your_backend_url
```

## 🏃‍♂️ Running the Application

### Development Mode

Run the development server:

```bash
pnpm dev
# or
npm run dev
# or
yarn dev
```
The app will be available at:
http://localhost:5173


## Build

Create a production build:

```bash
pnpm build
# or
npm run build
# or
yarn build
```

## Preview Production Build

```bash
pnpm preview
# or
npm run preview
# or
yarn preview
```

## Linting

Run ESLint checks:

```bash
pnpm lint
# or
npm run lint
# or
yarn lint
```

## 📁 Project Structure

```
workcity-assessment-frontend/
├── public/                 # Static assets
├── src/
│   ├── admin/              # Authenticated Admin-related Route-based pages
│   ├── assets/             # Images, fonts, icons
│   ├── components/         # Reusable UI components
│   ├── data/               # State management and API management
│   ├── pages/              # Authenticated User Route-based pages
│   ├── screens/            # Unauthenticated Route-based sections/screens
│   ├── App.css
│   ├── App.tsx             # Main App component
│   ├── index.css
│   ├── main.tsx            # App entry point
│   ├── PageRender.tsx      # File-based Routing configuration
│   ├── Router.tsx          # Routing output
│   ├── typography.css
│   └── vite-env.d.ts       # TypeScript Vite types
├── .eslintrc.cjs           # ESLint config
├── .gitignore
├── index.html              # HTML template
├── package.json
├── pnpm-lock.yaml
├── tsconfig.json
├── tsconfig.node.json
├── vercel.json             # Vercel deployment config
└── vite.config.ts          # Vite config
```


## 🛠️ Key Dependencies

### Core Technologies

- **React 19.x.x** - UI library
- **TypeScript 5.x.x** - Type safety
- **Vite 7.x.x** - Build tool and dev server
- **React Router DOM 7.x.x** - Routing Managemnt

### Authentication & APIs

- **Axios** - HTTP client

### State Management

- **Zustand** - State management

### Form Validation

- **React Hook Form** - Form Validation and Processing

## 🎨 Styling

This project uses a combination of:

- **Chakra UI** for component-based styling
- **Tailwind CSS** for utility classes
- **Lucide React** for Icons and Effect styling

## 📝 Scripts Explained

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production (includes TypeScript compilation and Vite build)
- `npm run lint` - Run ESLint for code quality checks
- `npm run preview` - Preview production build locally
