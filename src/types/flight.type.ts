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
