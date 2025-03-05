import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../context/UserContext';
import { Link, Navigate } from 'react-router-dom';
import axios from 'axios';

function Hosting() {
    const [places, setPlaces] = useState([]);
    const [reservations, setReservations] = useState([]);
    const { ready, user } = useContext(UserContext);
    const [rejectionReason, setRejectionReason] = useState('');

    useEffect(() => {
        // Fetch places
        axios.get('/places').then(response => {
            setPlaces(response.data);
        });

        // Fetch reservations
        axios.get('/host-bookings').then(response => {
            setReservations(response.data);
        });
    }, []);

    const updateBookingStatus = (bookingId, status) => {
        axios.put('/update-booking-status', { bookingId, status, rejection_reason: rejectionReason })
            .then(response => {
                setReservations(reservations.map(reservation =>
                    reservation._id === bookingId ? { ...reservation, status } : reservation
                ));
                setRejectionReason(''); // Clear the rejection reason after updating
            })
            .catch(error => {
                console.error('Failed to update booking status:', error);
            });
    };

    if (!ready) {
        return 'Loading...';
    }

    if (ready && !user) {
        return <Navigate to="/login" />;
    }

    return (
        <section className='py-10'>
            <div className='flex items-center justify-between'>
                <h1 className='text-3xl font-bold'>Welcome, {user.name}!</h1>
                <Link to="/account/places/new" className='border border-black px-4 py-1 font-bold rounded-lg'>
                    Add new place
                </Link>
            </div>
            <div className='flex items-center justify-between mt-20'>
                <h2 className='text-2xl font-bold'>Your reservations</h2>
                <Link to="#" className='tracking-wider font-semibold underline'>
                    All reservations ({reservations.length})
                </Link>
            </div>
            <div className='bg-gray-100 text-center mt-5 p-10'>
                {reservations.length > 0 ? (
                    <div>
                        {reservations.map(reservation => (
                            <div key={reservation._id} className='bg-white max-w-72 text-start p-5 rounded-lg shadow-md mb-4'>
                                <h3 className='text-lg font-semibold'>{reservation.place.title}</h3>
                                <p className='text-gray-600'>Guest: {reservation.user.name}</p>
                                <p className='text-gray-600'>Check-in: {new Date(reservation.checkIn).toLocaleDateString()}</p>
                                <p className='text-gray-600'>Check-out: {new Date(reservation.checkOut).toLocaleDateString()}</p>
                                <p className='text-gray-600'>Total Price: ₹{reservation.totalPrice}</p>
                                <p className='text-gray-600'>Status: {reservation.status}</p>
                                {reservation.status === 'cancelled' && reservation.rejection_reason && (
                                    <p className='text-red-600'>Rejection Reason: {reservation.rejection_reason}</p>
                                )}
                                <div className='flex gap-2 mt-2'>
                                    <button
                                        className='bg-blue-800 text-white px-4 py-2 rounded-lg'
                                        onClick={() => updateBookingStatus(reservation._id, 'confirmed')}
                                    >
                                        Approve
                                    </button>
                                    <button
                                        className='bg-red-500 text-white px-4 py-2 rounded-lg'
                                        onClick={() => updateBookingStatus(reservation._id, 'cancelled')}
                                    >
                                        Reject
                                    </button>
                                </div>
                                {reservation.status === 'pending' && (
                                    <div className='mt-2'>
                                        <textarea
                                            placeholder='Rejection Reason (optional)'
                                            value={rejectionReason}
                                            onChange={(e) => setRejectionReason(e.target.value)}
                                            className='w-full p-2 border border-gray-300 rounded'
                                        />
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                ) : (
                    <div>
                        <p>You don't have any reservations yet.</p>
                        <p>When you get a reservation, you'll find it here.</p>
                    </div>
                )}
            </div>
        </section>
    );
}

export default Hosting;