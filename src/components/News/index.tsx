import React from "react";
import { NewsInterface } from "../../services/types/new.interface";
import DateFormatter from "../DateFormatter";
import NewThumbnails from "../Icons/NewThumbnails";

interface NewsProps {
    data: NewsInterface[] | undefined;
    error: Error | null;
    isLoading: boolean;
}


export const News: React.FC<NewsProps> = ({ data, error, isLoading }) => {

    if (isLoading) return <div>Loading...</div>;
    if (error instanceof Error) return <div>Error: {error.message}</div>;

    return (
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
            {data?.map((news, index) => (
                <div className="col" key={index}>
                    <div className="card shadow-sm">
                        {news.urlToImage && <img className="bd-placeholder-img card-img-top" width="100%" height="255" src={news.urlToImage} />}
                        {!news.urlToImage && <NewThumbnails />}

                        <div className="card-body">
                            <p className="card-text">{news.title}</p>
                            <div className="d-flex justify-content-between align-items-center">
                                <div className="btn-group">
                                    <a type="button" href={news.url} target="_blank" className="btn btn-sm btn-outline-secondary">Read More</a>
                                </div>
                                <small className="text-body-secondary">
                                    <DateFormatter date={news.publishedAt} formatString="dd/MM/yyyy" />
                                </small>
                            </div>
                        </div>
                    </div>
                </div>
            ))}

        </div>
    )
}