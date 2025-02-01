// Import utilities
import { useNavigate } from 'react-router-dom';

// Import components and hooks
import { useFlights } from '../../hooks/useFlights';
import FlightTable from '../../components/FlightTable';
import Loader from '../../components/UI/Loader';

/**
 * Home Component
 * Displays a list of flights in a table format with navigation capabilities
 * @returns {JSX.Element} Home component
 */
export const Home = (): JSX.Element => {
    const navigate = useNavigate();
    const { flights, loading: flightsLoading, error: flightsError } = useFlights();

    // Show loading state while fetching flights
    if (flightsLoading) {
        return <Loader />;
    }

    // Display error message if fetch failed
    if (flightsError) {
        return <div className="error">Error: {flightsError}</div>;
    }

    // Show message when no flights are available
    if (flights.length === 0) {
        return <div className="error">Flights not found</div>;
    }

    return (
        <>
            <FlightTable
                flights={flights}
                onSelectFlight={(id: string) => navigate(`/flight/${id}`)}
            />
        </>
    );
}; 