# Oriane Frontend

This project is the frontend of Oriane, developed with [Vite](https://vitejs.dev/) and React, using TypeScript to ensure a robust and maintainable development experience.

## 🚀 Key Technologies

- **React**: UI library.
- **React Router**: Routing library for managing navigation between views.
- **React Context API**: State management tool for global state handling.
- **Vite**: Lightweight and fast development tool.
- **TypeScript**: A typed superset of JavaScript.
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development.
- **PostCSS**: A tool for transforming styles with plugins.
- **ESLint & Prettier**: Code linting and formatting tools for consistency.
- **Bun**: A fast package manager and runtime.
- **Axios**: HTTP client for API consumption.
- **Supabase**: Backend-as-a-Service for database and authentication.
- **Radix UI**: Accessible and reusable components.

## 📦 Prerequisites

Ensure you have the following installed:

- 📦 [Bun](https://bun.sh/) (version 1.0 or higher).
- 🧰 **Node.js** (Recommended version: 18+) - For compatibility with certain tools.
- 🌐 **Supabase Account** - For backend and database management (if applicable).

## 🛠️ Environment Configuration

Create a `.env` file in the project root with the following configuration:

```env
VITE_API_URL=https://oriane-backend.onrender.com
```

## 💻 Installation and setup

### 1. Installing dependencies

```bash
bun i
```

### 2. Start development server

```bash
bun run dev
```

Visit the application at http://localhost:5173.

### 3. Build for production

```bash
bun run build
```

The production-ready files will be available in the `dist` folder.

### 4. Deploy the application

Upload the files in the `dist` folder to your chosen hosting platform, such as [Netlify](https://www.netlify.com/) or [Vercel](https://vercel.com/).

## 📂 Project structure

```plain text
src/
├── api/                # Manages API requests and communication with the backend
├── assets/             # Static assets such as images and logos
├── components/         # Reusable React components for building the UI
├── constants/          # Centralized constants used across the application
├── context/            # React context files for global state management
├── hooks/              # Custom React hooks for reusable logic
├── layouts/            # Layout components for structuring pages
├── lib/                # Utility functions and helper scripts
├── middleware/         # Components like route guards or interceptors
├── pages/              # Page-specific components representing application routes
├── router/             # Application routing logic with React Router
├── types/              # TypeScript type definitions
├── utils/              # Additional helper files and global styles
├── App.tsx             # Main application component
├── main.tsx            # Entry point of the React application
├── vite-env.d.ts       # TypeScript environment declarations for Vite
└── index.html          # Root HTML file for the React application
```

## 🔄 Backend Interaction

The frontend interacts with a backend built using [NestJS](https://nestjs.com/). The base URL for API requests is configured via the `VITE_API_URL` variable in the `.env` file. Ensure the backend is deployed and accessible before using the application.

## 📚 API Documentation

To learn more about the routes and behaviour of the backend, see the backend README.

## 📄 License

This project is licensed under the MIT License.
