// Import utilities
import { useState, useEffect } from 'react';

// Import type
import { Flight } from '../types/flight.type';

// Base API URL for flight-related endpoints
const API_BASE = import.meta.env.VITE_API_BASE_URL;

/**
 * Custom hook to fetch and manage a list of flights
 * @returns {Object} Object containing flights data, loading state, error state, and refetch function
 */
export const useFlights = () => {
    const [flights, setFlights] = useState<Flight[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    /**
     * Fetches flights data from the API
     */
    const fetchFlights = async (): Promise<void> => {
        try {
            const response = await fetch(`${API_BASE}/flights`);
            if (!response.ok) throw new Error('Failed to fetch flights');
            const data = await response.json();
            setFlights(data);
            setError(null);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFlights();
        // Set up polling interval for real-time updates
        const interval = setInterval(fetchFlights, 30000); // Refresh every 30 seconds
        
        // Cleanup interval on component unmount
        return () => clearInterval(interval);
    }, []);

    return { flights, loading, error, refetch: fetchFlights };
};

/**
 * Custom hook to fetch and manage details of a specific flight
 * @param {string} id - The unique identifier of the flight
 * @returns {Object} Object containing flight data, loading state, and error state
 */
export const useFlightDetail = (id: string) => {
    const [flight, setFlight] = useState<Flight | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        /**
         * Fetches specific flight data from the API
         */
        const fetchFlight = async (): Promise<void> => {
            try {
                const response = await fetch(`${API_BASE}/flights/${id}`);
                if (!response.ok) throw new Error('Flight not found');
                const data = await response.json();
                setFlight(data);
                setError(null);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An error occurred');
            } finally {
                setLoading(false);
            }
        };

        fetchFlight();
    }, [id]);

    return { flight, loading, error };
}; 
