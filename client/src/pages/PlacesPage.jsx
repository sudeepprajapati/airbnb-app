import { Link } from "react-router-dom";
import axios from "axios";

import AccountNavigation from "../Components/AccountNavigation";
import { useEffect, useState } from "react";

export default function PlacesPage() {
    const [places, setPlaces] = useState([])

    useEffect(() => {
        axios.get('/places').then(({ data }) => {
            setPlaces(data)
        })

    }, [])


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
                    <Link to={'/account/places/' + place._id} key={place._id} className="flex gap-4 bg-gray-100 p-4 rounded-2xl cursor-pointer overflow-hidden">
                        <div className="w-32 h-32 bg-gray-200 rounded-2xl min-w-32 min-h-32 ">
                            {place.photos.length > 0 &&
                                <img src={`http://localhost:3000/uploads/${place.photos[0]}`} alt={place.title} className="object-cover w-full h-full" />}

                            {/* // : <p className="">No photos</p>} */}

                        </div>
                        <div className="grow-0 shrink">
                            <h2 className="text-xl">{place.title}</h2>
                            <p>{place.address}</p>
                            <p className="text-sm mt-2">{place.description}</p>
                            <p>{place.perks}</p>
                            <p>{place.checkIn}</p>
                            <p>{place.checkOut}</p>
                            <p>{place.maxGuests}</p>
                            <p>{place.extraInfo}</p>
                        </div>
                    </Link>
                )) : <p>No places found</p>}
            </div>
        </div>
    )

}