/**
 * Represents a flight entity with its essential details
 * @interface Flight
 */
export interface Flight {
    /** Unique identifier for the flight */
    id: string;

    /** Flight number assigned by the airline */
    flightNumber: string;

    /** Name of the operating airline */
    airline: string;

    /** Airport code or name of departure location */
    origin: string;

    /** Airport code or name of arrival location */
    destination: string;

    /** Scheduled departure time of the flight */
    departureTime: string;

    /** Current status of the flight */
    status: 'On Time' | 'Delayed' | 'Boarding' | 'Departed';
}

/**
 * Return type for the useFlights hook containing flight data and state
 * @interface UseFlightsReturn
 */
export interface UseFlightsReturn {
    /** Array of flight objects */
    flights: Flight[];

    /** Loading state indicator */
    loading: boolean;

    /** Error message if request fails, null otherwise */
    error: string | null;

    /** Function to manually refresh flight data */
    refetch: () => Promise<void>;
}

/**
 * Return type for the useFlightDetail hook containing single flight data and state
 * @interface UseFlightDetailReturn
 */
export interface UseFlightDetailReturn {
    /** Single flight object, null if not found */
    flight: Flight | null;

    /** Loading state indicator */
    loading: boolean;

    /** Error message if request fails, null otherwise */
    error: string | null;
}