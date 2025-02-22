import AccountNavigation from '../Components/AccountNavigation'
// import PlaceImg from '../Components/PlaceImg.jsx'
import { differenceInCalendarDays, format } from 'date-fns';
import { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';
import BookingDates from '../Components/BookingDates';


export default function BookingsPage() {
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await axios.get('/bookings');
                setBookings(response.data);
            } catch (error) {
                console.log('Failed to fetch bookings:', error);
            }
        };

        fetchBookings();
    }, []);

    return (
        <div>
            <AccountNavigation />
            <div className='flex flex-col gap-4 p-1 md:p-4'>
                {bookings.length > 0 ? bookings.map(booking => (
                    <Link to={`/account/bookings/${booking._id}`} key={booking._id} className="md:flex bg-gray-100 p-2 gap-4 rounded-2xl overflow-hidden">
                        <div className="w-48 bg-gray-200 m-auto md:m-0">
                            <h1 className='text-center'>Image</h1>
                            {/* <PlaceImg src={booking.place} /> */}
                        </div>
                        <div className='py-3 md:pr-3 '>
                            <h2 className='text-xl'>{booking.place.title}</h2>
                            <BookingDates booking={booking} className="text-gray-500 border-t border-gray-100 py-1" />
                            <div className='flex flex-col gap-1 border-t border-gray-100 py-2'>
                                <div className='flex gap-1'>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                                    </svg>
                                    <p>Guests: {booking.numberOfGuests}</p>

                                </div>
                                <div className='flex gap-1'>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-7">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z" />
                                    </svg>
                                    <p className='text-lg'>Total Price: ₹{booking.totalPrice}</p>
                                </div>
                            </div>
                        </div>
                    </Link>
                )) : <div>No bookings</div>}
            </div>
        </div>
    )
}
