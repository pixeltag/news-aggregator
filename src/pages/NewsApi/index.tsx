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

export default function NewsApi() {
    const [search, setSearch] = useState<string>('')
    const [source, setSource] = useState<string>('')

    const debouncedSearch = useDebounce(search, 500)

    const getQueryFn = (source: string) => {
        console.log(source)
        switch (source) {
            case NewsSource.Guardian:
                return (search: string) => fetchGuardianApi(search);
            case NewsSource.NewsApi:
                return (search: string) => fetchNewsApi(search);
            case NewsSource.NYTimes:
                return (search: string) => fetchNYTimesApi(search);
            default:
                return (search: string) => fetchNewsApi(search);
        }
    }

    const queryFn = getQueryFn(source);

    const { data, error, isLoading } = useQuery<NewsInterface[], Error>({
        queryKey: ['news', search, source],
        queryFn: () => queryFn(search),
        enabled: !!debouncedSearch,
        // You can also provide initialData, onSuccess, onError, etc. here if needed
    });



    console.log(data)
    return (
        <>
            <h3 className='mb-2 text-sm' data-testid="title">NewsApi</h3>
            <div>
                <SearchBar
                    onSearch={(query: string) => setSearch(query)}
                    onSource={(source: string) => setSource(source)} />

                <News data={data} error={error} isLoading={isLoading} />

            </div>
        </>
    )
}