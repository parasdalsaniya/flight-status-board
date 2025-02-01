// Import utilities
import React from 'react';
import { useParams } from 'react-router-dom';

// Import components, hooks and style
import './style.css';
import { useFlightDetail } from '../../hooks/useFlights';
import Loader from '../../components/UI/Loader';

/**
 * FlightDetailsPage Component
 * Displays detailed information about a specific flight including:
 * - Flight number and airline
 * - Flight status
 * - Route information (origin and destination)
 * - Departure date and time
 */
const FlightDetailsPage: React.FC = () => {
    // Extract flight ID from URL parameters
    const { id } = useParams<{ id: string }>();
    
    // Fetch flight details using custom hook
    const { 
        flight: flightDetails, 
        loading: flightLoading, 
        error: flightError 
    } = useFlightDetail(id || "");

    // Show loading state while fetching data
    if (flightLoading) {
        return <Loader />;
    }

    // Handle error state
    if (flightError) {
        return <div className="error">Error: {flightError}</div>;
    }

    // Handle case when flight details are not found
    if (!flightDetails) {
        return <div className="error">Flight not found</div>;
    }

    // Format departure date and time for display
    const formattedDate = new Date(flightDetails.departureTime).toLocaleDateString();
    const formattedTime = new Date(flightDetails.departureTime).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit'
    });

    return (
        <main data-testid="mock-flight-details" className="flight-details-page">
            {/* Header section with flight number and status */}
            <header className="page-header">
                <div className="header-content">
                    <h1 className="flight-number">
                        {flightDetails.flightNumber}
                    </h1>
                    <div 
                        className={`status-badge status-${flightDetails.status.toLowerCase().replace(' ', '-')}`}
                        role="status"
                        aria-label={`Flight status: ${flightDetails.status}`}
                    >
                        {flightDetails.status}
                    </div>
                </div>
                <span className="header-content airline-name">
                    {flightDetails.airline}
                </span>
            </header>

            {/* Flight route visualization section */}
            <section className="flight-route-section" aria-label="Flight route information">
                <div className="route-display">
                    <div className="route-point" aria-label="Departure city">
                        <span className="city-code">{flightDetails.origin}</span>
                        <span className="city-label">Departure</span>
                    </div>

                    <div className="route-connection" aria-hidden="true">
                        <div className="connection-line"></div>
                        <span className="airplane-icon" role="img" aria-hidden="true">✈️</span>
                    </div>

                    <div className="route-point" aria-label="Arrival city">
                        <span className="city-code">{flightDetails.destination}</span>
                        <span className="city-label">Arrival</span>
                    </div>
                </div>
            </section>

            {/* Departure time section */}
            <section className="departure-time-section" aria-label="Departure time">
                <h2 className="section-title">Departure Time</h2>
                <div className="time-display">
                    <time className="time" dateTime={flightDetails.departureTime}>
                        {formattedTime}
                    </time>
                    <time className="date" dateTime={flightDetails.departureTime}>
                        {formattedDate}
                    </time>
                </div>
            </section>
        </main>
    );
};

export default FlightDetailsPage; 