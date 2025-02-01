import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Layout } from '../index';

/**
 * Test suite for Layout Component
 * Tests the main structural elements of the application layout
 */
describe('Layout Component', () => {
    /**
     * Test case: Verifies the basic structure of the Layout component
     * Checks for the presence of essential elements:
     * 1. Navigation bar
     * 2. Main container
     */
    it('should render the main layout structure with navbar and container', () => {
        // Arrange
        render(
            <BrowserRouter>
                <Layout />
            </BrowserRouter>
        );

        // Act & Assert
        // Verify navigation bar presence
        const navbar = document.querySelector('nav');
        expect(navbar).toBeInTheDocument();

        // Verify main container presence
        const container = document.querySelector('.container');
        expect(container).toBeInTheDocument();
    });
}); 