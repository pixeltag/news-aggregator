import { render, screen, cleanup } from '@testing-library/react';
import App from './App';

test('Should render App component', () => {
  render(<App />)
  const appElement = screen.getByTestId('app')
  expect(appElement).toBeInTheDocument();
});

test('Should render has header component', () => {
  render(<App />)
  const appElement = screen.getByTestId('header')
  expect(appElement).toBeInTheDocument();
});