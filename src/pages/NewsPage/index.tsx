import React, { useState } from 'react'
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
    const [search, setSearch] = useState<string>('')
    const [source, setSource] = useState<string>('')
    const [startDate, setStartDate] = useState<string>('')
    const [endDate, setEndDate] = useState<string>('')
    const [category, setCategory] = useState<string>('')

    const debouncedSearch = useDebounce(search, 2000)

    const getQueryFn = (source: string, startDate: string, endDate: string) => {
        console.log(source)
        switch (source) {
            case NewsSource.Guardian:
                return (search: string, startDate: string, endDate: string) => fetchGuardianApi(search, startDate, endDate, category);
            case NewsSource.NewsApi:
                return (search: string) => fetchNewsApi(search, startDate, endDate, category);
            case NewsSource.NYTimes:
                return (search: string) => fetchNYTimesApi(search, startDate, endDate, category);
            default:
                return (search: string) => fetchNewsApi(search, startDate, endDate, category);
        }
    }

    const queryFn = getQueryFn(source, startDate, endDate);

    const { data, error, isLoading } = useQuery<NewsInterface[], Error>({
        queryKey: ['news', search, source, startDate, endDate, category],
        queryFn: () => queryFn(search, startDate, endDate),
        enabled: !!debouncedSearch,
        // You can also provide initialData, onSuccess, onError, etc. here if needed
    });



    console.log(data)
    return (
        <>
            <h3 className='mb-2 text-sm' data-testid="title">Search News</h3>
            <div>
                <div className="p-4 border bg-light my-4 rounded">
                    <SearchBar
                        onSearch={(query: string) => setSearch(query)}
                        onSource={(source: string) => setSource(source)}
                        onStartDate={(startDate: string) => setStartDate(startDate)}
                        onEndDate={(startDate: string) => setEndDate(startDate)}
                        onCategory={(category: string) => setCategory(category)}
                    />
                </div>
                <News data={data} error={error} isLoading={isLoading} />
            </div>
        </>
    )
}