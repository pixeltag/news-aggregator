import { render, screen, cleanup } from '@testing-library/react';
import Header from './Header';

test('Should render Header component', () => {
    render(<Header />)
    const headerElement = screen.getByTestId('header')
    const logoElement = screen.getByTestId('logo')
    expect(headerElement).toBeInTheDocument();
    expect(logoElement).toBeInTheDocument();
    expect(headerElement).toHaveTextContent('BuildingLink')
});

test('It renders correctly', () => {
    const element = render(<Header />)
    expect(element).toMatchSnapshot();
})