// Import utilities
import React from 'react';

// Import style
import './style.css';

/**
 * Loader Component
 * 
 * A simple loading animation component that displays three animated dots.
 * Used to indicate loading states throughout the application.
 * 
 * @component
 * @example
 * ```tsx
 * <Loader />
 * ```
 */
const Loader: React.FC = (): JSX.Element => {
    return (
        <div data-testid="loader" className="loader-container">
            {/* Main loader wrapper with three animated dots */}
            <div className="loader">
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
            </div>
        </div>
    );
};

export default Loader;

