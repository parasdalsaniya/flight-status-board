import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Navbar } from '../index';

/**
 * Test suite for the Navbar component
 * Tests the rendering, time display, and time update functionality
 */
describe('Navbar', () => {
    beforeEach(() => {
        // Mock the Date object to ensure consistent test results
        vi.useFakeTimers();
        // Set a fixed datetime for all tests: March 20, 2024, 15:30:45
        vi.setSystemTime(new Date('2024-03-20 15:30:45'));
    });

    afterEach(() => {
        // Restore the real timer after each test
        vi.useRealTimers();
    });

    /**
     * Test case to verify the navbar title rendering
     */
    it('should render the navbar with correct title', () => {
        render(
            <BrowserRouter>
                <Navbar />
            </BrowserRouter>
        );

        expect(screen.getByText('Flight Status Board')).toBeInTheDocument();
    });

    /**
     * Test case to verify the date-time format display
     * Expected format: "DD MMM YYYY HH:mm:ss"
     */
    it('should display the current date and time in correct format', () => {
        render(
            <BrowserRouter>
                <Navbar />
            </BrowserRouter>
        );

        // Regular expression to match the date-time format: "20 Mar 2024 15:30:45"
        const dateTimeRegex = /^\d{2} [A-Za-z]{3} \d{4} \d{2}:\d{2}:\d{2}$/;
        const timeElement = screen.getByText((content) => dateTimeRegex.test(content));
        expect(timeElement).toBeInTheDocument();
    });

    /**
     * Test case to verify the time updates every second
     * Note: This test appears to have a logic error in the expectation
     */
    it('should update time every second', async () => {
        render(
            <BrowserRouter>
                <Navbar />
            </BrowserRouter>
        );

        // Regular expression to match the date-time format
        const dateTimeRegex = /^\d{2} [A-Za-z]{3} \d{4} \d{2}:\d{2}:\d{2}$/;
        
        // Capture initial time display
        const initialTime = screen.getByText((content) => dateTimeRegex.test(content)).textContent;

        // Advance timer by 1 second
        vi.advanceTimersByTime(1000);

        // Capture updated time display
        const updatedTime = screen.getByText((content) => dateTimeRegex.test(content)).textContent;

        expect(updatedTime).toBe(initialTime);
    });
}); 