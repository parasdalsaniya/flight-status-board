// Import test utilities
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';

// Import components and hooks
import FlightDetailsPage from '../index';
import { useFlightDetail } from '../../../hooks/useFlights';
import { Flight } from '../../../types/flight.type';

// Mock the useFlights hook
vi.mock('../../../hooks/useFlights', () => ({
    useFlightDetail: vi.fn()
}));

// Define mock flight data for testing
const mockFlightData: Flight = {
    id: '123',
    flightNumber: 'FL123',
    airline: 'Test Airlines',
    origin: 'LAX',
    destination: 'JFK',
    departureTime: '2024-03-20T10:30:00Z',
    status: 'On Time'
};

describe('FlightDetailsPage', () => {
    /**
     * Test Suite for FlightDetailsPage component
     * Testing different states and scenarios of the flight details page
     */

    it('renders loading state', () => {
        // Mock the hook to return loading state
        (useFlightDetail as any).mockReturnValue({
            flight: null,
            loading: true,
            error: null
        });

        render(
            <MemoryRouter initialEntries={['/flights/123']}>
                <Routes>
                    <Route path="/flights/:id" element={<FlightDetailsPage />} />
                </Routes>
            </MemoryRouter>
        );

        expect(screen.getByTestId('loader')).toBeInTheDocument();
    });

    it('renders error state', () => {
        // Mock the hook to return error state
        (useFlightDetail as any).mockReturnValue({
            flight: null,
            loading: false,
            error: 'Failed to fetch flight details'
        });

        render(
            <MemoryRouter initialEntries={['/flights/123']}>
                <Routes>
                    <Route path="/flights/:id" element={<FlightDetailsPage />} />
                </Routes>
            </MemoryRouter>
        );

        expect(screen.getByText(/Error: Failed to fetch flight details/i)).toBeInTheDocument();
    });

    it('renders flight not found state', () => {
        // Mock the hook to return null flight data
        (useFlightDetail as any).mockReturnValue({
            flight: null,
            loading: false,
            error: null
        });

        render(
            <MemoryRouter initialEntries={['/flights/123']}>
                <Routes>
                    <Route path="/flights/:id" element={<FlightDetailsPage />} />
                </Routes>
            </MemoryRouter>
        );

        expect(screen.getByText(/Flight not found/i)).toBeInTheDocument();
    });

    it('renders flight details correctly', () => {
        // Mock the hook to return successful flight data
        (useFlightDetail as any).mockReturnValue({
            flight: mockFlightData,
            loading: false,
            error: null
        });

        render(
            <MemoryRouter initialEntries={['/flights/123']}>
                <Routes>
                    <Route path="/flights/:id" element={<FlightDetailsPage />} />
                </Routes>
            </MemoryRouter>
        );

        // Verify main flight information
        expect(screen.getByText('FL123')).toBeInTheDocument();
        expect(screen.getByText('Test Airlines')).toBeInTheDocument();
        expect(screen.getByText('LAX')).toBeInTheDocument();
        expect(screen.getByText('JFK')).toBeInTheDocument();
        expect(screen.getByText('On Time')).toBeInTheDocument();

        // Verify route section elements
        expect(screen.getByLabelText('Flight route information')).toBeInTheDocument();
        expect(screen.getByLabelText('Departure city')).toBeInTheDocument();
        expect(screen.getByLabelText('Arrival city')).toBeInTheDocument();

        // Verify departure time section
        expect(screen.getByLabelText('Departure time')).toBeInTheDocument();
        expect(screen.getByText('Departure Time')).toBeInTheDocument();
    });

    it('handles empty flight ID', () => {
        // Mock the hook for empty flight ID scenario
        (useFlightDetail as any).mockReturnValue({
            flight: null,
            loading: false,
            error: null
        });

        render(
            <MemoryRouter initialEntries={['/flights/""']}>
                <Routes>
                    <Route path="/flights/:id" element={<FlightDetailsPage />} />
                </Routes>
            </MemoryRouter>
        );

        expect(screen.getByText(/Flight not found/i)).toBeInTheDocument();
    });
}); 