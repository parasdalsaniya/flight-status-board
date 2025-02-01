// Import utilities
import { Outlet } from 'react-router-dom';

// Import components and style
import { Navbar } from '../Navbar';
import './style.css';

/**
 * Layout Component
 * 
 * A wrapper component that provides a consistent layout structure for the application.
 * Includes a navigation bar and a container for the main content rendered through
 * React Router's Outlet component.
 * 
 * @returns {JSX.Element} The Layout component with navigation and content area
 */
export const Layout: React.FC = (): JSX.Element => {
    return (
        <div>
            <Navbar />
            <div className="container">
                <Outlet />
            </div>
        </div>
    );
}; 