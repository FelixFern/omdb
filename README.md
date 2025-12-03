# OMDB Movie Search Application

A modern, responsive movie search application built with React and TypeScript that leverages the OMDB (Open Movie Database) API to provide users with comprehensive movie information.

## Overview

This application allows users to search for movies, view detailed information about each film, and explore movie databases with an intuitive and visually appealing interface. The project demonstrates modern React development practices, including state management, routing, and comprehensive testing.

## Features

- **Real-time Movie Search**: Search for movies with autocomplete suggestions powered by debounced API calls
- **Movie Listings**: Browse search results in a responsive grid layout with poster images
- **Detailed Movie Information**: View comprehensive details including:
  - Plot synopsis
  - Cast and crew information
  - Ratings (IMDb)
  - Release year, runtime, and genre
  - Awards and box office performance

## Project Structure

```
src/
├── components/
│   ├── custom/              # Custom reusable components
│   │   └── AutoCompleteInput/   # Search input with autocomplete
│   ├── pages/               # Page-level components
│   │   ├── HomePage/            # Search and results page
│   │   └── MovieDetailPage/     # Movie details page
│   └── ui/                  # Base UI components (shadcn/ui)
├── hooks/                   # Custom React hooks
│   └── useDebounce.ts          # Debounce hook for search optimization
├── lib/                     # Utility libraries
│   ├── axios.ts                # Configured axios instance
│   └── utils.ts                # Helper functions
├── mock/                    # Mock data for testing
├── routes/                  # TanStack Router configuration
├── service/                 # API service layer
│   └── omdb.ts                 # OMDB API service
├── store/                   # Redux state management
│   ├── slices/                 # Redux slices
│   │   └── moviesSlice.ts      # Movies state and actions
│   └── store.ts                # Store configuration
└── types/                   # TypeScript type definitions
```

## Getting Started

### Prerequisites

- **Node.js**: v18 or higher
- **Package Manager**: npm or pnpm
- **OMDB API Key**: free API key from [OMDB API](http://www.omdbapi.com/apikey.aspx)

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd omdb
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   pnpm install
   ```

3. **Set up environment variables**

   Create a `.env` file in the root directory:

   ```env
   VITE_API_URL=http://www.omdbapi.com/
   VITE_API_KEY=your_api_key_here
   ```

### Running the Application

**Development mode:**

```bash
npm run dev
# or
pnpm dev
```

The app will be available at `http://localhost:3000`

**Production build:**

```bash
npm run build
# or
pnpm build
```

**Preview production build:**

```bash
npm run serve
# or
pnpm serve
```

## Available Scripts

| Script               | Description                                |
| -------------------- | ------------------------------------------ |
| `dev`                | Starts the development server on port 3000 |
| `build`              | Creates an optimized production build      |
| `serve`              | Previews the production build locally      |
| `test`               | Runs all unit tests                        |
| `test -- --coverage` | Runs tests with coverage report            |
| `question-1`         | Runs script to group anagrams (Q1)         |

> **Note**: The solution for Question 1 (Logic Test - Group Anagrams) can be found in the `scripts/` folder. Run it using `npm run question-1` or `pnpm question-1`.

## Tech Stack

### Core Technologies

- **[React 19](https://react.dev/)** - UI library
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[Vite](https://vitejs.dev/)** - Fast build tool and dev server

### Styling

- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Radix UI](https://www.radix-ui.com/)** - Accessible component primitives
- **[Lucide React](https://lucide.dev/)** - Beautiful icon library

### State & Routing

- **[Redux Toolkit](https://redux-toolkit.js.org/)** - State management
- **[TanStack Router](https://tanstack.com/router)** - Type-safe routing

### Testing

- **[Vitest](https://vitest.dev/)** - Unit testing framework
- **[React Testing Library](https://testing-library.com/react)** - Component testing utilities
- **[@vitest/coverage-v8](https://vitest.dev/guide/coverage.html)** - Code coverage reporting

### HTTP Client

- **[Axios](https://axios-http.com/)** - Promise-based HTTP client

## Testing

### Running Tests

```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test -- --watch

# Run tests with coverage
npm run test -- --coverage
```

### Test Coverage

The project maintains comprehensive test coverage across critical components:

**Test Statistics:**

- **Total Tests**: 21 tests across 4 test files
- **Overall Coverage**: ~90% statement coverage

**Tested Components:**

- ✅ `AutoCompleteInput` (8 tests) - Search input with keyboard navigation
- ✅ `HomePage` (5 tests) - Search functionality and error handling
- ✅ `MovieDetailPage` (3 tests) - Movie details display and navigation
- ✅ `useDebounce` hook (5 tests) - Debounce functionality

**Coverage Configuration:**

- Includes all TypeScript/TSX files in `src/`
- Excludes: entry points, generated files, test files, and type definitions
- Reports: text (console), JSON, and HTML formats
- View detailed coverage: Open `coverage/index.html` in your browser

## Key Features Implementation

### Autocomplete Search

The search functionality uses a custom `AutoCompleteInput` component with:

- Debounced API calls (150ms delay) to optimize performance
- Keyboard navigation (Arrow keys, Enter)
- Real-time suggestions from search results
- Accessible design with proper ARIA attributes

### State Management

Redux Toolkit manages application state with slices for:

- Movie search results
- Movie details
- Loading and error states
- Pagination support

### Routing

TanStack Router provides:

- Type-safe route definitions
- URL parameter handling
- Navigation history management
- Code splitting per route

## Acknowledgments

- [OMDB API](http://www.omdbapi.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- All open-source libraries used in this project
