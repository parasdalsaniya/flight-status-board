# [Real-Time Flight Status Board](https://flight-status-board-cyan.vercel.app/)

## Overview
This project is a React-based application built using TypeScript that mimics a real-time flight status board. The application retrieves flight details from a provided API, updates the data at regular intervals, and allows users to view detailed information about a specific flight.

## Features
- **Flight Table**: Displays a list of flights with real-time updates.
- **Detail View**: Clicking on a flight shows more details.
- **Navigation**: Uses React Router for seamless navigation.
- **Error Handling**: Provides feedback for network errors or missing flight details.
- **User-Friendly UI**: Styled for readability and ease of use.

## Tech Stack
- **Frontend**: React (Vite) with TypeScript
- **HTTP Client**: Fetch
- **Routing**: React Router
- **Testing**: Vitest, React Testing Library

## Installation and Setup

### Prerequisites
Ensure you have the following installed on your system:
- [Node.js](https://nodejs.org/) (v16+ recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Clone the Repository
```sh
git clone git@github.com:parasdalsaniya/flight-status-board.git
cd flight-status-board
```

### Install Dependencies
Using npm:
```sh
npm install
```
Using yarn:
```sh
yarn install
```

### Environment Variables
Create a `.env` file in the project root and configure the following variables:
```env
VITE_API_BASE_URL=https://flight-status-mock.core.travelopia.cloud
```

## Running the Application

### Start the Development Server
```sh
npm run dev
```
Or using yarn:
```sh
yarn dev
```

The application will be available at `http://localhost:3000/` (default Vite port).

## Running Tests

### Run Unit Tests
```sh
npm run test
```
Or using yarn:
```sh
yarn test
```

### Run Test Coverage
```sh
npm run test:coverage
```
Or using yarn:
```sh
yarn test:coverage
```

## Project Structure
```md
.
├── eslint.config.js       # ESLint configuration file
├── index.html             # Main HTML file
├── package.json           # Project dependencies and scripts
├── package-lock.json      # Lockfile for package versions
├── public
│   └── favicon.svg        # Favicon for the application
├── README.md              # Project documentation
├── src                    # Source code directory
│   ├── App.test.tsx       # Tests for the main App component
│   ├── App.tsx            # Root component of the application
│   ├── components         # UI components
│   │   ├── FlightTable    # Flight table component
│   │   │   ├── index.tsx  # Component logic
│   │   │   └── style.css  # Styling
│   │   ├── Layout         # Layout wrapper component
│   │   │   ├── index.tsx  # Component logic
│   │   │   ├── style.css  # Styling
│   │   │   └── __test__
│   │   │       └── Layout.test.tsx  # Unit tests for Layout
│   │   ├── Navbar         # Navigation bar component
│   │   │   ├── index.tsx  # Component logic
│   │   │   ├── style.css  # Styling
│   │   │   └── __tests__
│   │   │       └── Navbar.test.tsx  # Unit tests for Navbar
│   │   └── UI             # Reusable UI components
│   │       ├── Loader     # Loading spinner component
│   │       │   ├── index.tsx
│   │       │   └── style.css
│   │       └── Table      # Generic table component
│   │           ├── index.tsx
│   │           ├── style.css
│   │           └── table.type.ts    # Type definitions
│   ├── hooks              # Custom hooks
│   │   ├── useFlights.test.ts  # Tests for flight hook
│   │   └── useFlights.ts       # Hook for fetching flight data
│   ├── index.css          # Global styles
│   ├── main.tsx           # Application entry point
│   ├── pages              # Page components
│   │   ├── FlightDetails  # Flight details page
│   │   │   ├── index.tsx
│   │   │   ├── style.css
│   │   │   └── __test__
│   │   │       └── index.test.tsx  # Tests for FlightDetails page
│   │   └── Home         # Home page component
│   │       ├── index.tsx
│   │       └── __test__
│   │           └── index.test.tsx  # Tests for Home page
│   ├── types               # Type definitions
│   │   └── flight.type.ts   # TypeScript types for flights
│   └── vite-env.d.ts        # Vite environment types
├── tsconfig.app.json       # TypeScript config for app
├── tsconfig.json           # TypeScript project configuration
├── tsconfig.node.json      # TypeScript config for Node.js
├── vite.config.ts          # Vite configuration file
├── vitest.config.ts        # Vitest configuration
└── vitest.setup.ts         # Test setup file
```

## API Endpoints
- Fetch all flights: `GET https://flight-status-mock.core.travelopia.cloud/flights`
- Fetch flight details: `GET https://flight-status-mock.core.travelopia.cloud/flights/:id`

## Deployment
To build the application for production:
```sh
npm run build
```
Or using yarn:
```sh
yarn build
```

To preview the production build locally:
```sh
npm run preview
```
Or using yarn:
```sh
yarn preview
```

## Contributing
1. Fork the repository.
2. Create a new feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -m "Add new feature"`
4. Push to the branch: `git push origin feature-name`
5. Open a pull request.

## Contact
For any questions or suggestions, feel free to reach out:
- Email: paras.dalsaniya29@gmail.com
