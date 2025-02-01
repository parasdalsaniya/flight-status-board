// Import utilities
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

// Import style
import './style.css';

/**
 * Navbar Component
 * Displays the main navigation bar with application title and current date/time
 * @returns {JSX.Element} Rendered Navbar component
 */
export const Navbar = (): JSX.Element => {
    // State to track current date/time
    const [currentTime, setCurrentTime] = useState<Date>(new Date());

    // Effect to update time every second
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        // Cleanup interval on component unmount
        return () => clearInterval(timer);
    }, []);

    /**
     * Formats the date and time according to GB locale
     * @param {Date} date - Date object to format
     * @returns {string} Formatted date and time string
     */
    const formatDateTime = (date: Date): string => {
        const formattedDate = date.toLocaleString('en-GB', {
            dateStyle: 'medium',
        });
        const formattedTime = date.toLocaleTimeString('en-GB', {
            timeStyle: 'medium'
        });
        return `${formattedDate} ${formattedTime}`.replace(/\//g, '-');
    };

    return (
        <nav className="navbar">
            <div className="nav-content">
                <Link to="/" className="link">
                    <h1>Flight Status Board</h1>
                </Link>
                <div className="current-time">
                    <h2>{formatDateTime(currentTime)}</h2>
                </div>
            </div>
        </nav>
    );
}; 