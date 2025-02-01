import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Component imports
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import FlightDetailsPage from './pages/FlightDetails';

// Styles
import './index.css';

/**
 * Root component of the application.
 * Handles the main routing configuration using React Router.
 * @returns {JSX.Element} The rendered App component
 */
const App = (): JSX.Element => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Layout />}>
                    {/* Home page route */}
                    <Route index element={<Home />} />

                    {/* Flight details page with dynamic ID parameter */}
                    <Route
                        path="flight/:id"
                        element={
                            <FlightDetailsPage data-testid="mock-flight-details" />
                        }
                    />
                </Route>
            </Routes>
        </Router>
    );
};

export default App;
