import  React,{useRef} from 'react';
import { Button } from "@mui/material";

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
            <Button variant="outlined" color="primary" onClick={onSearch}>Search</Button>
        </div>
    );
};

export default SearchBar;