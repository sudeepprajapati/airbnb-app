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

    const handleDelete = async (id) => {
        try {
            await axios.delete(`/places/${id}`);
            setPlaces(places.filter(place => place._id !== id));
        } catch (error) {
            console.error('Failed to delete the place:', error);
        }
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
                        <div className="flex flex-col gap-2 relative">
                            <div className="w-full md:w-4/5">
                                <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                                    {place.photos.length > 0 ? place.photos.map((photo, index) => (
                                        <img key={index} src={`http://localhost:3000/uploads/${photo}`} alt={place.title} className="object-cover w-full rounded-2xl" />
                                    )) : <p className="col-span-2 md:col-span-3">No photos</p>}
                                </div>
                            </div>
                            <div className='flex flex-col gap-2 absolute right-0'>
                                <Link to={'/account/places/' + place._id} className='bg-primary p-1 w-20 text-center rounded-md text-white '>Edit</Link>
                                <button onClick={() => handleDelete(place._id)} className='bg-primary p-1 w-20 text-center rounded-md text-white'>Delete</button>
                            </div>
                            <div className="flex-grow flex gap-4 md:gap-20 flex-col md:flex-row ">
                                <div className='flex flex-col gap-2 max-w-4xl '>
                                    <h2 className="text-xl">{place.title}</h2>
                                    <p className="text-gray-500">Farm stay in {place.address}</p>
                                    <div className='grid grid-cols-2 md:flex items-center gap-2'>
                                        <div className='flex flex-col md:flex-row md:gap-1'>
                                            <p><span className='font-semibold '>₹{place.price}</span> night</p>
                                            <span className='hidden md:block'>-</span>
                                            <p className="text-md ">
                                                {place.maxGuests}+ &nbsp;
                                                {place.maxGuests > 1 ? ('guests') : ('guest')}
                                            </p>
                                            <span className='hidden md:block'>-</span>
                                        </div>
                                        <div className='md:flex flex-col md:flex-row md:gap-1 '>
                                            <p className="text-md">Check-in: {formatDate(place.checkIn)}</p>
                                            <span className='hidden md:block'>-</span>
                                            <p className="text-md">Check-out: {formatDate(place.checkOut)}</p>
                                        </div>
                                    </div>
                                    <p className="text-md mt-2 truncate">{place.description}</p>
                                    <p className="text-md mt-2 ">Perks: {place.perks}</p>
                                    <p className="text-md mt-2 truncate">ExtraInfo:  {place.extraInfo}</p>
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