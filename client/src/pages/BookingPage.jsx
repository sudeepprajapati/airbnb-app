import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import AddressLink from '../Components/AddressLink'
import PlaceGallery from '../Components/PlaceGallery';
import BookingDates from '../Components/BookingDates';


export default function BookingPage() {
    const { id } = useParams();
    const [booking, setBooking] = useState(null)

    useEffect(() => {
        if (id) {
            axios.get(`/bookings/`).then(res => {
                const foundBooking = res.data.find(({ _id }) => _id === id)
                if (foundBooking) {
                    setBooking(foundBooking);
                }
            })
        }
    }, [id])

    if (!booking) return '';

    return (
        <div className='mt-4 py-4 '>
            <div className="flex-grow flex flex-col gap-4 ">
                <div className='flex flex-col gap-1'>
                    <h1 className="text-2xl font-bold">{booking.place.title}</h1>
                    <AddressLink>
                        {booking.place.address}
                    </AddressLink>
                </div>
                <div className="bg-gray-200 p-4 md:p-6 mb-6 rounded-2xl md:flex gap-5 items-center justify-between">
                    <div className='mb-5'>
                        <h2 className='text-xl mb-2'>Your booking information:</h2>
                        <BookingDates booking={booking} className="text-gray-500 border-t border-gray-100 py-2 " />
                    </div>
                    <div className='bg-primary p-4 md:p-6  text-white rounded-2xl'>
                        <div>
                            Total price
                        </div>
                        <div className='text-2xl font-semibold'>
                            ₹{booking.totalPrice}
                        </div>
                    </div>
                </div>
                <PlaceGallery place={booking.place} />
            </div>
        </div>
    )
}
