import axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import BookingWidget from '../Components/BookingWidget'
import PlaceGallery from '../Components/PlaceGallery'
import AddressLink from '../Components/AddressLink'

export default function PlacePage() {
    const { id } = useParams()
    const [place, setPlace] = useState(null)

    useEffect(() => {
        if (!id) {
            return;
        }
        axios.get(`/places/${id}`).then(response => {
            setPlace(response.data)
        })
    }, [id])

    if (!place) return '';

    return (
        <div className='mt-4 px-3 py-4 '>
            <div className="flex-grow flex flex-col gap-4 ">
                <div className='flex flex-col gap-2'>
                    <h1 className="text-2xl font-bold">{place.title}</h1>
                    <PlaceGallery place={place} />
                </div>
                <div className='md:flex md:gap-20 gap-5 ' >
                    <div className='max-w-3xl'>
                        <div className='flex flex-col gap-1'>
                            <AddressLink>
                                {place.address}
                            </AddressLink>
                            <p className="text-md ">{place.maxGuests}+ &nbsp;
                                {place.maxGuests > 1 ? ('guests') : ('guest')}
                            </p>
                        </div>
                        <hr className='my-4' />
                        <p className='font-bold my-5'>Hosted by {place.owner.name}</p>
                        <hr className='my-4' />
                        <div>
                            <h2 className="text-md font-medium">{place.description}</h2>
                        </div>
                        <hr className='my-3' />
                        <div className="text-md gap-2">
                            <p className='font-bold'>What this place offers</p>
                            {place.perks.map((perk, index) => (
                                <ul >
                                    <li key={index} className='text-base capitalize flex flex-col'>- {perk} </li>
                                </ul>
                            ))}
                        </div>
                        <hr className='my-3' />
                        <div >
                            {place.extraInfo.length > 0 && (
                                <div>
                                    <p className='font-semibold'>ExtraInfo</p>
                                    <span className='text-gray-700'>{place.extraInfo}</span>
                                </div>
                            )}
                        </div>
                    </div>
                    <BookingWidget />
                </div>
            </div>
        </div>
    )
}
