// Import test utilities
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';

// Import components and hooks
import { Home } from '../index';
import { useFlights } from '../../../hooks/useFlights';
import { useNavigate } from 'react-router-dom';
import { Flight } from '../../../types/flight.type';

// Mock external dependencies
vi.mock('../../../hooks/useFlights');
vi.mock('react-router-dom');

describe('Home Component', () => {
    // Initialize mock navigation function
    const mockNavigate = vi.fn();

    // Reset all mocks before each test
    beforeEach(() => {
        vi.clearAllMocks();
        (useNavigate as any).mockReturnValue(mockNavigate);
    });

    // Test loading state
    it('should show loading state', () => {
        (useFlights as any).mockReturnValue({
            flights: [],
            loading: true,
            error: null
        });

        render(<Home />);
        expect(screen.getByTestId('loader')).toBeInTheDocument();
    });

    // Test error handling
    it('should show error message when there is an error', () => {
        const errorMessage = 'Failed to fetch flights';
        (useFlights as any).mockReturnValue({
            flights: [],
            loading: false,
            error: errorMessage
        });

        render(<Home />);
        expect(screen.getByText(`Error: ${errorMessage}`)).toBeInTheDocument();
    });

    // Test empty flights state
    it('should show "Flights not found" when flights array is empty', () => {
        (useFlights as any).mockReturnValue({
            flights: [],
            loading: false,
            error: null
        });

        render(<Home />);
        expect(screen.getByText('Flights not found')).toBeInTheDocument();
    });

    // Test flight table rendering and interaction
    it('should render FlightTable and handle flight selection', () => {
        const mockFlights: Flight[] = [
            {
                id: "1",
                flightNumber: "A1B14",
                airline: "Airline 1",
                origin: "Origin 1",
                destination: "Destination 1",
                departureTime: "2025-02-01T09:05:00.663Z",
                status: "On Time"
            }
        ];

        (useFlights as any).mockReturnValue({
            flights: mockFlights,
            loading: false,
            error: null
        });

        render(<Home />);

        // Test flight selection interaction
        const flightRow = screen.getByText('A1B14');
        fireEvent.click(flightRow);

        // Verify navigation after flight selection
        expect(mockNavigate).toHaveBeenCalledWith('/flight/1');
    });
});