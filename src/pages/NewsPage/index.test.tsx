import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import NewsPage from './index';
import { fetchNewsApi } from '../../services/news-api.service';
import { fetchGuardianApi } from '../../services/guardian-api.service';
import { fetchNYTimesApi } from '../../services/nytimes-api.service';
import { useQuery } from '@tanstack/react-query';

jest.mock('../../services/news-api.service');
jest.mock('../../services/guardian-api.service');
jest.mock('../../services/nytimes-api.service');

jest.mock('@tanstack/react-query', () => ({
    useQuery: jest.fn(),
}));

describe('NewsPage', () => {
    const mockNewsData = [
        { title: 'Test News 1', urlToImage: 'image1.jpg', publishedAt: '2025-01-01' },
        { title: 'Test News 2', urlToImage: 'image2.jpg', publishedAt: '2025-01-02' },
    ];

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should render search bar and fetch news based on search input', async () => {
        (useQuery as jest.Mock).mockReturnValue({
            data: mockNewsData,
            isLoading: false,
            error: null,
        });

        render(<NewsPage />);
        expect(screen.getByLabelText(/Search/i)).toBeInTheDocument();

        const searchInput = screen.getByLabelText(/Search/i);
        fireEvent.change(searchInput, { target: { value: 'test' } });

        await waitFor(() => expect(useQuery).toHaveBeenCalled());
        expect(screen.getByText('Test News 1')).toBeInTheDocument();
        expect(screen.getByText('Test News 2')).toBeInTheDocument();
    });

    it('should show loading message while fetching data', async () => {
        (useQuery as jest.Mock).mockReturnValue({
            data: undefined,
            isLoading: true,
            error: null,
        });

        render(<NewsPage />);
        expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
    });

    it('should show error message if there is an error', async () => {
        const error = new Error('Failed to fetch');

        (useQuery as jest.Mock).mockReturnValue({
            data: undefined,
            isLoading: false,
            error,
        });

        render(<NewsPage />);
        expect(screen.getByText(/Error: Failed to fetch/i)).toBeInTheDocument();
    });

    it('should change the source and fetch news from the selected source', async () => {

        (useQuery as jest.Mock).mockReturnValue({
            data: mockNewsData,
            isLoading: false,
            error: null,
        });

        render(<NewsPage />);


        const sourceSelect = screen.getByLabelText(/Source/i);
        fireEvent.change(sourceSelect, { target: { value: 'guardian' } });

        await waitFor(() => expect(useQuery).toHaveBeenCalled());
        expect(screen.getByText('Test News 1')).toBeInTheDocument();
        expect(screen.getByText('Test News 2')).toBeInTheDocument();
    });
});
