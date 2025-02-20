import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Header from './Header';  // Adjust the path based on your folder structure

describe('Header Component', () => {
    test('renders Header component with logo, title, and navigation', () => {
        render(
            <Header />
        );

        expect(screen.getByTestId('header')).toBeInTheDocument();
        expect(screen.getByTestId('logo')).toBeInTheDocument();
        expect(screen.getByText(/news aggregator/i)).toBeInTheDocument();
    });
});
