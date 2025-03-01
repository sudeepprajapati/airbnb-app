import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';
import { SearchContext } from '../Layout';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

function SearchResults() {
    const query = useQuery();
    const searchQuery = query.get('query');
    const [filteredPlaces, setFilteredPlaces] = useState([]);

    useEffect(() => {
        if (searchQuery) {
            axios.get('/places').then(response => {
                const filtered = response.data.filter(place => place.address.toLowerCase().includes(searchQuery.toLowerCase()));
                setFilteredPlaces(filtered);
            });
        }
    }, [searchQuery]);

    const placeCountText = filteredPlaces.length > 1 ? 'over' : '';
    const placeLabel = filteredPlaces.length > 1 ? 'places' : 'place';

    const searchResultMessage = searchQuery
        ? `${placeCountText} ${filteredPlaces.length} ${placeLabel} in ${searchQuery}`
        : '';


    return (
        <div className='mt-7'>
            {searchResultMessage && (
                <div className='text-base font-medium mb-4'>
                    {searchResultMessage}
                </div>
            )}
            <div className='grid gap-x-6 gap-y-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-w-[365px] sm:max-w-full ml-2'>
                {filteredPlaces.length > 0 ? (
                    filteredPlaces.map(place => (
                        <Link to={`/places/${place._id}`} className="flex flex-col" key={place._id}>
                            <div className="bg-gray-500 mb-2 rounded-2xl flex max-h-[345px] sm:h-auto">
                                {place.photos?.[0] && (
                                    <img
                                        src={`http://localhost:3000/uploads/${place.photos?.[0]}`}
                                        alt="No Image found"
                                        className='rounded-2xl object-cover aspect-square'
                                    />
                                )}
                            </div>
                            <h2 className='font-semibold '>{place.address}</h2>
                            <h3 className='text-sm text-gray-600 '>{place.title}</h3>
                            <div className='mt-1 font-semibold '>
                                <span className="font-bold"> ₹{place.price} night</span>
                            </div>
                        </Link>
                    ))
                ) : (
                    <div>No places found</div>
                )}
            </div>
        </div>
    );
}

export default SearchResults;