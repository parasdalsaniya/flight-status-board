// Import test utilities
import { ReactNode } from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';

// Import components
import App from './App';

/**
 * Mock Setup
 * We mock child components to isolate App component testing
 * and prevent full component tree rendering
 */

// Mock Layout component with a simple wrapper that renders children
vi.mock('./components/Layout', () => ({
    Layout: ({ children }: { children: ReactNode }) => (
        <div data-testid="mock-layout">{children}</div>
    ),
}));

// Mock Home page component with a simple placeholder
vi.mock('./pages/Home', () => ({
    Home: () => <div data-testid="mock-home">Home</div>,
}));

// Mock FlightDetails page component with a simple placeholder
vi.mock('./pages/FlightDetails', () => ({
    default: () => <div data-testid="mock-flight-details">Flight Details</div>,
}));

/**
 * Mock react-router-dom's BrowserRouter
 * We keep all other router functionality but simplify the BrowserRouter
 * to work better in tests
 */
vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom');
    return {
        ...actual,
        BrowserRouter: ({ children }: { children: ReactNode }) => <>{children}</>,
    };
});

/**
 * App Component Test Suite
 * Tests the routing functionality of the main App component
 */
describe('App', () => {
    /**
     * Test case for root route ('/')
     * Verifies that the Layout component is rendered when accessing the home page
     */
    it('renders home page at root route', () => {
        render(
            <MemoryRouter initialEntries={['/']}>
                <App />
            </MemoryRouter>
        );
        expect(screen.queryByTestId('mock-layout')).toBeInTheDocument();
    });

    /**
     * Test case for flight details route ('/flight/:id')
     * Verifies that the Layout component is rendered when accessing a specific flight page
     */
    it('renders flight details page for flight route', () => {
        render(
            <MemoryRouter initialEntries={['/flight/1']}>
                <App />
            </MemoryRouter>
        );
        expect(screen.queryByTestId('mock-layout')).toBeInTheDocument();
    });
}); 