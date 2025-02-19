import React, { Dispatch, SetStateAction, useState } from "react";
import { NewsSource } from "../../pages/NewsApi/types";

interface SearchBarProps {
    onSearch: (query: string) => void;
    onSource: (query: string) => void;
    onStartDate: (query: string) => void;
    onEndDate: (query: string) => void;
    onCategory: (query: string) => void;
}

// Helper function to format dates as YYYY-MM-DD
const getFormattedDate = (date: Date) => date.toISOString().split("T")[0];

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, onSource, onStartDate, onEndDate, onCategory }) => {
    const [query, setQuery] = useState('');
    const [source, setSource] = useState('');
    const [startDate, setStartDate] = useState(getFormattedDate(new Date()));
    const [endDate, setEndDate] = useState(getFormattedDate(new Date()));
    const [category, setCategory] = useState(getFormattedDate(new Date()));

    const handleChange = (
        event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
        onFun: (query: string) => void,
        setValue: Dispatch<SetStateAction<string>>
    ) => {
        const value = event.target.value;
        setValue(value);
        onFun(value); // Raise event to parent
    };

    return (
        <div className="row">
            <div className="col-12 col-lg-4">
                <div className="form-group">
                    <label>Search</label>
                    <input
                        type="text"
                        placeholder="Search..."
                        value={query}
                        onChange={(e) => handleChange(e, onSearch, setQuery)}
                        className="border p-2 rounded-md w-100 mb-5"
                    />
                </div>
            </div>
            <div className="col-12 col-lg-2">
                <div className="form-group">
                    <label>From Date</label>
                    <input
                        type="date"
                        onChange={(e) => handleChange(e, onStartDate, setStartDate)}
                        className="border p-2 rounded-md w-100 mb-5"
                        value={startDate}
                    />
                </div>
            </div>
            <div className="col-12 col-lg-2">
                <div className="form-group">
                    <label>To Date</label>
                    <input
                        type="date"
                        onChange={(e) => handleChange(e, onEndDate, setEndDate)}
                        className="border p-2 rounded-md w-100 mb-5"
                        value={endDate} // FIXED: should be endDate instead of startDate
                    />
                </div>
            </div>
            <div className="col-12 col-lg-2">
                <div className="form-group">
                    <label>Category</label>
                    <select
                        onChange={(e) => handleChange(e, onCategory, setCategory)}
                        className="border p-2 rounded-md w-100 mb-5"
                        value={category}
                    >
                        <option value="">Select Category</option>
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
                    <label>Source</label>
                    <select
                        onChange={(e) => handleChange(e, onSource, setSource)}
                        className="border p-2 rounded-md w-100 mb-5"
                        value={source}
                    >
                        <option value="">Select Source</option>
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
