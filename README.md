# OMDB Project

## Description

This project is a movie database application using the OMDB API for searching movies and displays movie details.

## Project Structure

```
src/
├── components/
│   ├── custom/          # Custom reusable components (e.g., AutoCompleteInput)
│   ├── pages/           # Page components (HomePage, MovieDetailPage)
│   └── ui/              # UI components (buttons, inputs, etc.)
├── hooks/               # Custom hooks
├── lib/                 # Utilities and libraries (axios, utils)
├── mock/                # Mock data and setup for tests
├── routes/              # Router configuration
├── store/               # Redux store setup
└── types/               # TypeScript type definitions
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or pnpm

### Installation

1. Clone the repository.
2. Install dependencies:

```bash
npm install
# or
pnpm install
```

### Running the App

Start the development server:

```bash
npm run dev
# or
pnpm dev
```

The app will be available at `http://localhost:3000` (or the port shown in the terminal).

## Scripts

- `dev`: Starts the development server.
- `build`: Builds the app for production.
- `serve`: Previews the production build.
- `test`: Runs unit tests using Vitest.
- `question-1`: Runs the group anagram script.

## Tech Stack

- **Framework**: React, Vite
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Redux Toolkit
- **Routing**: TanStack Router
- **Testing**: Vitest, React Testing Library

## Testing

To run the unit tests:

```bash
npm run test
```

### Test Coverage

The project has comprehensive test coverage across critical components:

- **Components**: `AutoCompleteInput`, `HomePage`, `MovieDetailPage`
- **Hooks**: `useDebounce`
- **Total Tests**: 19 tests across 4 test files

All tests are written using Vitest and React Testing Library.

### Coverage

To generate a coverage report:

```bash
npm run test -- --coverage
```

The coverage report is configured to:

- Include all TypeScript/TSX files in `src/`
- Exclude: `main.tsx`, `reportWebVitals.ts`, `routeTree.gen.ts`, `src/routes`, test files, and type definitions
- Generate reports in text, JSON, and HTML formats

Coverage reports will be available in the `coverage/` directory.
