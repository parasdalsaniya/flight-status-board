import { renderHook, waitFor } from '@testing-library/react';
import { describe, it, expect, beforeAll, afterAll, afterEach } from 'vitest';
import { setupServer } from 'msw/node';
import { http } from 'msw';
import { useFlights, useFlightDetail } from './useFlights';

const API_BASE = 'https://flight-status-mock.core.travelopia.cloud';

// Mock flight data representing a single flight record
const mockFlight = {
    id: 1,
    flightNumber: "A1B14",
    airline: "Airline 1",
    origin: "Origin 1",
    destination: "Destination 1",
    departureTime: "2025-02-01T09:05:00.663Z",
    status: "On Time"
};

// Setup MSW (Mock Service Worker) server with mock API endpoints
const server = setupServer(
    // Mock endpoint for fetching all flights
    http.get(`${API_BASE}/flights`, () => {
        return Response.json([mockFlight]);
    }),
    // Mock endpoint for fetching a single flight by ID
    http.get(`${API_BASE}/flights/:id`, () => {
        return Response.json(mockFlight);
    })
);

// Start server before all tests
beforeAll(() => server.listen());

// Reset handlers after each test
afterEach(() => server.resetHandlers());

// Close server after all tests
afterAll(() => server.close());

// Test suite for useFlights hook
describe('useFlights', () => {
    it('should fetch flights successfully', async () => {
        // Render the hook in a test environment
        const { result } = renderHook(() => useFlights());

        // Verify initial loading state
        expect(result.current.loading).toBe(true);
        expect(result.current.flights).toEqual([]);

        // Wait for the async operation to complete
        await waitFor(() => {
            expect(result.current.loading).toBe(false);
        });

        // Verify successful data fetch
        expect(result.current.error).toBeNull();
        expect(result.current.flights).toEqual([mockFlight]);
    });

    it('should handle error when API fails', async () => {
        // Override the handler to simulate a server error (500)
        server.use(
            http.get(`${API_BASE}/flights`, () => {
                return new Response(null, { status: 500 });
            })
        );

        const { result } = renderHook(() => useFlights());

        // Wait for error state to be set
        await waitFor(() => {
            expect(result.current.loading).toBe(false);
        });

        // Verify error handling
        expect(result.current.error).toBe('Failed to fetch flights');
        expect(result.current.flights).toEqual([]);
    });

    it('should handle non-Error objects in catch block', async () => {
        // Override the handler to simulate a non-standard error
        server.use(
            http.get(`${API_BASE}/flights`, () => {
                // Simulate throwing a string instead of an Error object
                // This tests our error handling robustness
                throw 'Random error string';
            })
        );

        const { result } = renderHook(() => useFlights());

        // Wait for error state to be updated
        await waitFor(() => {
            expect(result.current.loading).toBe(false);
        });

        // Verify error handling for non-Error objects
        expect(result.current.error).toBe('Failed to fetch flights');
        expect(result.current.flights).toEqual([]);
    });
});

// Test suite for useFlightDetail hook
describe('useFlightDetail', () => {
    it('should fetch single flight successfully', async () => {
        // Render the hook with a specific flight ID
        const { result } = renderHook(() => useFlightDetail('1'));

        // Verify initial loading state
        expect(result.current.loading).toBe(true);
        expect(result.current.flight).toBeNull();

        // Wait for the async operation to complete
        await waitFor(() => {
            expect(result.current.loading).toBe(false);
        });

        // Verify successful data fetch
        expect(result.current.error).toBeNull();
        expect(result.current.flight).toEqual(mockFlight);
    });

    it('should handle error when flight not found', async () => {
        // Override the handler to simulate a 404 not found response
        server.use(
            http.get(`${API_BASE}/flights/:id`, () => {
                return new Response(null, { status: 404 });
            })
        );

        // Test with a non-existent flight ID
        const { result } = renderHook(() => useFlightDetail('999'));

        // Wait for error state to be updated
        await waitFor(() => {
            expect(result.current.loading).toBe(false);
        });

        // Verify not found error handling
        expect(result.current.error).toBe('Flight not found');
        expect(result.current.flight).toBeNull();
    });

    it('should handle non-Error objects in catch block', async () => {
        // Override the handler to simulate unexpected error scenarios
        server.use(
            http.get(`${API_BASE}/flights/:id`, () => {
                // Simulate throwing a string instead of an Error object
                // This tests our error handling robustness
                throw 'Random error string';
            })
        );

        const { result } = renderHook(() => useFlightDetail('1'));

        // Wait for error state to be updated
        await waitFor(() => {
            expect(result.current.loading).toBe(false);
        });

        // Verify error handling for non-Error objects
        expect(result.current.error).toBe('Flight not found');
        expect(result.current.flight).toBeNull();
    });
});
