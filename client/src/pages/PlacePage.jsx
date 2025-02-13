import axios from 'axios'
import React, { useContext, useEffect } from 'react'
import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { UserContext } from '../context/UserContext'
import BookingWidget from '../Components/BookingWidget'

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
                    <div className="grid gap-x-2 grid-cols-[2fr_1fr_1fr] ">
                        <div className="">
                            {place.photos?.[0] && (
                                <div className="">
                                    <img src={`http://localhost:3000/uploads/${place.photos?.[0]}`}
                                        alt={place.title}
                                        className="object-cover aspect-square lg:aspect-auto w-full max-h-80 rounded-l-xl" />
                                </div>
                            )}
                        </div>
                        <div className='grid gap-x-2 overflow-hidden'>
                            {place.photos?.[1] && (
                                <img src={`http://localhost:3000/uploads/${place.photos?.[1]}`} alt={place.title} className="object-cover aspect-square lg:aspect-auto max-h-40 w-full" />
                            )}
                            {place.photos?.[2] && (
                                <img src={`http://localhost:3000/uploads/${place.photos?.[2]}`} alt={place.title} className="object-cover aspect-square lg:aspect-auto max-h-40 w-full relative top-2" />
                            )}
                        </div>
                        <div className='grid gap-x-2 overflow-hidden'>
                            {place.photos?.[3] && (
                                <img src={`http://localhost:3000/uploads/${place.photos?.[3]}`} alt={place.title} className="object-cover aspect-square lg:aspect-auto max-h-40 w-full rounded-tr-xl" />
                            )}
                            {place.photos?.[4] && (
                                <img src={`http://localhost:3000/uploads/${place.photos?.[4]}`} alt={place.title} className="object-cover aspect-square lg:aspect-auto max-h-40 w-full rounded-br-2xl relative top-2" />
                            )}
                        </div>
                    </div>
                </div>
                <div className='md:flex md:gap-20 gap-5 ' >
                    <div className='max-w-3xl'>
                        <div className='flex flex-col gap-1'>
                            <Link
                                to={`https://maps.google.com/?=${place.address}`}
                                target="_blank"
                                className="mt-4 block font-semibold underline text-xl"
                            >
                                Farm stay in {place.address}
                            </Link>
                            <p className="text-md ">{place.maxGuests}+ &nbsp;
                                {place.maxGuests > 1 ? ('guests') : ('guest')}
                            </p>
                        </div>
                        <hr className='my-3' />
                        <div>
                            <h2 className="text-md font-medium">{place.description}</h2>
                        </div>
                        <hr className='my-2' />
                        <div className="text-md gap-2">
                            <p className='font-bold'>What this place offers</p>
                            {place.perks}
                        </div>
                        <hr className='my-2' />
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
