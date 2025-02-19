import { NewsSource } from "../../pages/NewsPage/types";

interface SearchBarProps {
    onSearch: (query: string) => void;
    onSource: (query: string) => void;
    onStartDate: (query: string) => void;
    onEndDate: (query: string) => void;
    onCategory: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, onSource, onStartDate, onEndDate, onCategory }) => {
    const handleChange = (
        event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
        onFun: (query: string) => void
    ) => {
        const value = event.target.value;
        onFun(value); // Raise event to parent
    };

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
                        onChange={(e) => handleChange(e, onSearch)}
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
                        onChange={(e) => handleChange(e, onStartDate)}
                        className="form-control"
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
                        onChange={(e) => handleChange(e, onEndDate)}
                        className="form-control" />
                </div>
            </div>
            <div className="col-12 col-lg-2">
                <div className="form-group">
                    <label htmlFor="category">Category</label>
                    <select
                        id="category"
                        name="category"
                        onChange={(e) => handleChange(e, onCategory)}
                        className="form-select"
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
                        onChange={(e) => handleChange(e, onSource)}
                        className="form-select"
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
