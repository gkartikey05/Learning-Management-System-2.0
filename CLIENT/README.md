<div align="center">
  <h1>Learning Management System 2.0 - Frontend</h1>
  <p>A modern React-based frontend for a Learning Management System, built with Vite, Redux Toolkit, TailwindCSS, DaisyUI, and more.</p>
</div>

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [Environment Variables](#environment-variables)
- [Deployment](#deployment)
- [Contributing](#contributing)

---

## Features

- Modern React (with hooks and functional components)
- State management with Redux Toolkit
- Routing with React Router DOM
- Authentication and role-based access
- Responsive UI with TailwindCSS and DaisyUI
- Toast notifications with react-hot-toast
- Chart visualizations with Chart.js
- Payment integration (Razorpay)
- Admin and user dashboards

## Tech Stack

- [React 19](https://react.dev/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [Vite](https://vitejs.dev/)
- [TailwindCSS](https://tailwindcss.com/)
- [DaisyUI](https://daisyui.com/)
- [React Router DOM](https://reactrouter.com/)
- [Axios](https://axios-http.com/)
- [Chart.js](https://www.chartjs.org/)
- [React Hot Toast](https://react-hot-toast.com/)
- [ESLint](https://eslint.org/)

## Project Structure

```
CLIENT/
├── public/                # Static assets (favicon, svg, etc.)
├── src/
│   ├── Assets/            # Images and videos
│   ├── Components/        # Reusable React components
│   ├── Constants/         # Static data/constants
│   ├── Helpers/           # Helper functions (e.g., axios instance)
│   ├── Layouts/           # Layout components
│   ├── Pages/             # Page components (by feature)
│   ├── Redux/             # Redux store and slices
│   ├── App.jsx            # Main app component (routes)
│   ├── main.jsx           # Entry point
│   ├── App.css, index.css # Styles
├── package.json           # Project metadata and scripts
├── vite.config.js         # Vite configuration
├── eslint.config.js       # ESLint configuration
├── vercel.json            # Vercel deployment config
└── README.md              # Project documentation
```

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/gkartikey05/Learning-Management-System-2.0.git
cd CLIENT
```

### 2. Install Dependencies

Make sure you have [Node.js](https://nodejs.org/) (v18 or above) and [npm](https://www.npmjs.com/) installed.

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root of the `CLIENT` directory with the following variable:

```
VITE_BASE_URL=<your-backend-api-url>
```

### 4. Start the Development Server

```bash
npm run dev
```

The app will be available at [http://localhost:5173](http://localhost:5173) (or as shown in your terminal).

## Available Scripts

- `npm run dev` - Start the development server with hot reload
- `npm run build` - Build the app for production (output in `dist/`)
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run ESLint to check for code issues

## Linting & Code Style

ESLint is configured for React, hooks, and import sorting. Run `npm run lint` to check code quality.

## Deployment

This project is ready to deploy on [Vercel](https://vercel.com/) (see `vercel.json`). You can also deploy the `dist/` folder to any static hosting provider after running `npm run build`.

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---

**Note:** This is the frontend only. You need to set up the backend separately and provide the correct `VITE_BASE_URL` in your `.env` file.
