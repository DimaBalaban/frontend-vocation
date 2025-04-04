import  React,{useRef} from 'react';

const SearchBar = ({searchValue, setSearchValue, onSearch}) => {
    const inputRef = useRef(null);

    return (
        <div className="search-bar">
            <input
            className="input_search"
            ref={inputRef}
            type="text"
            placeholder="Search by name or date (YYYY-MM-DD)"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            />
            <button onClick={onSearch}>Search</button>
        </div>
    );
};

export default SearchBar;