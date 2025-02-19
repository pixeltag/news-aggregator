import React, { useState } from "react";
import { NewsSource } from "../../pages/NewsApi/types";

interface SearchBarProps {
    onSearch: (query: string) => void;
    onSource: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, onSource }) => {
    const [query, setQuery] = useState('');
    const [source, setSource] = useState('');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setQuery(value);
        onSearch(value); // Raise event to parent
    };

    const handleSourceChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;
        setSource(value);
        onSource(value)
    }

    return (
        <div className="d-flex">

            <input
                type="text"
                placeholder="Search..."
                value={query}
                onChange={handleChange}
                className="border p-2 rounded-md w-100 mb-5"
            />

            <select onChange={handleSourceChange} className="border p-2 rounded-md w-100 mb-5">
                <option value={NewsSource.NewsApi}>NewsAPI</option>
                <option value={NewsSource.Guardian}>The Guardian</option>
                <option value={NewsSource.NYTimes}>New York Times</option>
            </select>
        </div>
    );
};

export default SearchBar;
