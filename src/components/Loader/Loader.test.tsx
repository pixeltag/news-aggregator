import { render, screen, cleanup } from '@testing-library/react';
import { Loader } from './Loader';

test('Should render Loader component', () => {
    render(<Loader />);
    const loaderElement = screen.getByTestId('loader');
    expect(loaderElement).toBeInTheDocument();
})


test('It renders correctly', () => {
    const element = render(<Loader />)
    expect(element).toMatchSnapshot();
})