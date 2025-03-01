import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SearchBar({ onSearch }) {
    const [query, setQuery] = useState("");
    const navigate = useNavigate();

    const handleSearch = () => {
        onSearch(query);
        navigate(`/search?query=${query}`);
    };

    return (
        <div>
            <div className='flex gap-12items-center border border-gray-300 rounded-full py-2 px-4 shadow-md shadow-gray-200'>
                <input
                    type="search"
                    placeholder="Search Destination"
                    className="outline-none border-none w-[148px] sm:w-[200px] md:w-[250px] "
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <button className='bg-primary text-white p-2 rounded-full' onClick={handleSearch}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4 ">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                    </svg>
                </button>
            </div>
        </div>
    );
}

export default SearchBar;