import React, { useState, useCallback, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchNewsApi } from '../../services/news-api.service';
import { NewsInterface } from '../../services/types/new.interface';
import SearchBar from '../../components/Search';
import { useDebounce } from '../../utilities/useDebounce';
import { News } from '../../components/News';
import { fetchGuardianApi } from '../../services/guardian-api.service';
import { NewsSource } from './types';
import { fetchNYTimesApi } from '../../services/nytimes-api.service';

export default function NewsPage() {
    const [search, setSearch] = useState<string>('');
    const [source, setSource] = useState<string>(NewsSource.NewsApi); // Default to NewsAPI
    const [startDate, setStartDate] = useState<string>('');
    const [endDate, setEndDate] = useState<string>('');
    const [category, setCategory] = useState<string>('');

    const debouncedSearch = useDebounce(search, 500);

    // Define the query function for fetching news based on source
    const getQueryFn = useCallback(
        (source: string) => {
            switch (source) {
                case NewsSource.Guardian:
                    return (search: string) => fetchGuardianApi(search, startDate, endDate, category);
                case NewsSource.NewsApi:
                    return (search: string) => fetchNewsApi(search, startDate, endDate, category);
                case NewsSource.NYTimes:
                    return (search: string) => fetchNYTimesApi(search, startDate, endDate, category);
                default:
                    return (search: string) => fetchNewsApi(search, startDate, endDate, category);
            }
        },
        [startDate, endDate, category] // Memoize for changes in filter parameters
    );

    const queryFn = getQueryFn(source);

    // Use useQuery hook to fetch the news data
    const { data, error, isLoading, isError } = useQuery<NewsInterface[], Error>({
        queryKey: ['news', debouncedSearch, source, startDate, endDate, category],
        queryFn: () => queryFn(debouncedSearch),
        enabled: !!debouncedSearch, // Disable query if there is no debounced search
        retry: false, // Avoid retrying on failure
    });

    useEffect(() => {
        // Reset the query result if any of the filters change
    }, [search, source, startDate, endDate, category]);

    return (
        <>
            <h3 className="mb-2 text-sm" data-testid="title">
                Search News
            </h3>
            <div>
                <div className="p-4 border bg-light my-4 rounded">
                    <SearchBar
                        onSearch={setSearch}
                        onSource={setSource}
                        onStartDate={setStartDate}
                        onEndDate={setEndDate}
                        onCategory={setCategory}
                    />
                </div>
                {/* Error and Loading States */}
                {isLoading && <p>Loading...</p>}
                {isError && error && <p>Error: {error.message}</p>}

                {/* News Component */}
                <News data={data} error={error} isLoading={isLoading} />
            </div>
        </>
    );
}
