import React, { useCallback } from "react";
import { NewsSource } from "../../pages/NewsPage/types";

interface SearchBarProps {
    onSearch: (query: string) => void;
    onSource: (query: string) => void;
    onStartDate: (query: string) => void;
    onEndDate: (query: string) => void;
    onCategory: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, onSource, onStartDate, onEndDate, onCategory }) => {
    const handleInputChange = useCallback(
        (
            event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
            callback: (query: string) => void
        ) => {
            const value = event.target.value;
            callback(value);
        },
        [] // Empty dependency array to memoize this function
    );

    return (
        <div className="row">
            <div className="col-12 col-lg-4">
                <div className="form-group">
                    <label htmlFor="search">Search</label>
                    <input
                        id="search"
                        name="search"
                        type="text"
                        className="form-control"
                        placeholder="Search..."
                        onChange={(e) => handleInputChange(e, onSearch)}
                        aria-label="Search"
                    />
                </div>
            </div>
            <div className="col-12 col-lg-2">
                <div className="form-group">
                    <label htmlFor="from">From</label>
                    <input
                        id="from"
                        name="from"
                        type="date"
                        onChange={(e) => handleInputChange(e, onStartDate)}
                        className="form-control"
                        aria-label="Start Date"
                    />
                </div>
            </div>
            <div className="col-12 col-lg-2">
                <div className="form-group">
                    <label htmlFor="to">To</label>
                    <input
                        id="to"
                        name="to"
                        type="date"
                        onChange={(e) => handleInputChange(e, onEndDate)}
                        className="form-control"
                        aria-label="End Date"
                    />
                </div>
            </div>
            <div className="col-12 col-lg-2">
                <div className="form-group">
                    <label htmlFor="category">Category</label>
                    <select
                        id="category"
                        name="category"
                        onChange={(e) => handleInputChange(e, onCategory)}
                        className="form-select"
                        aria-label="Category"
                    >
                        <option value="">- Select Category -</option>
                        <option value="business">Business</option>
                        <option value="entertainment">Entertainment</option>
                        <option value="general">General</option>
                        <option value="health">Health</option>
                        <option value="science">Science</option>
                        <option value="sports">Sports</option>
                        <option value="technology">Technology</option>
                    </select>
                </div>
            </div>
            <div className="col-12 col-lg-2">
                <div className="form-group">
                    <label htmlFor="source">Source</label>
                    <select
                        id="source"
                        name="source"
                        onChange={(e) => handleInputChange(e, onSource)}
                        className="form-select"
                        aria-label="Source"
                    >
                        <option value="">- Select Source -</option>
                        <option value={NewsSource.NewsApi}>NewsAPI</option>
                        <option value={NewsSource.Guardian}>The Guardian</option>
                        <option value={NewsSource.NYTimes}>New York Times</option>
                    </select>
                </div>
            </div>
        </div>
    );
};

export default SearchBar;
