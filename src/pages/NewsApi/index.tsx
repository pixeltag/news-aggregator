import React from 'react'
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { fetchNews } from '../../services/news-api.service';
import { NewsInterface } from '../../services/types/new.interface';

export default function NewsApi() {

    const { data, error, isLoading } = useQuery<NewsInterface[], Error>({
        queryKey: ['news'],
        queryFn: fetchNews,
        // You can also provide initialData, onSuccess, onError, etc. here if needed
    });

    if (isLoading) return <div>Loading...</div>;

    if (error instanceof Error) return <div>Error: {error.message}</div>;

    console.log(data)
    return (
        <>
            <h3 className='mb-2 text-sm' data-testid="title">NewsApi</h3>
            <div>
                <h1>News Articles</h1>
                <ul>
                    {data?.map((news) => (
                        <li key={news.id}>
                            <h3>{news.title}</h3>
                            <p>{news.content}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    )
}