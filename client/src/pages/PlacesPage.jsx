import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import AccountNavigation from "../Components/AccountNavigation";

const PlacesPage = () => {
    const [places, setPlaces] = useState([]);

    useEffect(() => {
        axios.get('/user-places').then(({ data }) => {
            setPlaces(data);
        });
    }, []);

    const formatDate = (date) => {
        const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
        return new Date(date).toLocaleDateString('en-GB', options); // 'en-GB' for dd/mm/yyyy format
    };

    return (
        <div>
            <AccountNavigation />
            <div className="text-center">
                <Link className="inline-flex gap-1 bg-primary text-white py-2 px-6 rounded-full" to={'/account/places/new'}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                    Add New Place
                </Link>
            </div>
            <div className="mt-4">
                {places.length > 0 ? places.map(place => (
                    <div key={place._id} className="block bg-gray-100 p-4 rounded-2xl overflow-hidden mb-4 shadow-lg shadow-gray-300">
                        <div className="flex flex-col gap-4 relative">
                            <div className="w-full md:w-4/5">
                                <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                                    {place.photos.length > 0 ? place.photos.map((photo, index) => (
                                        <img key={index} src={`http://localhost:3000/uploads/${photo}`} alt={place.title} className="object-cover w-full rounded-2xl" />
                                    )) : <p className="col-span-2 md:col-span-3">No photos</p>}

                                </div>
                            </div>
                            <Link to={'/account/places/' + place._id} className='bg-primary p-1 w-20 text-center rounded-md text-white absolute right-0'>Edit</Link>
                            <div className="flex-grow flex gap-20 00 ">
                                <div className='flex flex-col gap-2 max-w-2xl'>
                                    <h2 className="text-xl">{place.title}</h2>
                                    <p className="text-gray-500">Farm stay in {place.address}</p>
                                    <p className="text-md mt-2">{place.description}</p>
                                    <p className="text-md mt-2 gap-2">Perks: {place.perks}</p>
                                    <p className="text-md mt-2">ExtraInfo:  {place.extraInfo}</p>
                                </div>
                                <div className='flex flex-col gap-2 bg-gray-200 p-4 rounded-2xl h-fit shadow-xl shadow-gray-300'>
                                    <h3 className='font-semibold '>₹{place.price} night</h3>
                                    <p className="text-md mt-2">Check-in: {formatDate(place.checkIn)}</p>
                                    <p className="text-md mt-2">Check-out: {formatDate(place.checkOut)}</p>
                                    <p className="text-md mt-2">{place.maxGuests} guest</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )) : <p>No places found</p>}
            </div>
        </div>
    );
};

export default PlacesPage;