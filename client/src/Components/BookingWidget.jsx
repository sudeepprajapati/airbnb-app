import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { differenceInCalendarDays } from 'date-fns';

export default function BookingWidget() {
    const { id } = useParams();
    const [place, setPlace] = useState(null);
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [guests, setGuests] = useState(1);
    const [discount, setDiscount] = useState(0);
    const [serviceFeePercentage, setServiceFeePercentage] = useState(0.15);
    const checkInRef = useRef(null);

    let numberOfNights = 0;
    if (checkIn && checkOut) {
        numberOfNights = differenceInCalendarDays(new Date(checkOut), new Date(checkIn));
    }

    useEffect(() => {
        if (!id) {
            return;
        }
        axios.get(`/places/${id}`).then(response => {
            setPlace(response.data);
        });
    }, [id]);

    useEffect(() => {
        if (place) {
            let calculatedDiscount = 0;
            const subtotal = nightlyRate * numberOfNights;

            if (numberOfNights >= 30) {
                calculatedDiscount = subtotal * 0.20;
            } else if (numberOfNights >= 7) {
                calculatedDiscount = subtotal * 0.10;
            }

            setDiscount(calculatedDiscount);
        }
    }, [numberOfNights, place]);

    if (!place) return '';

    const handleCheckAvailabilityClick = () => {
        if (checkInRef.current) {
            checkInRef.current.focus(); // Focus on the check-in input
        }
    };

    // Calculate base nightly rate based on guest count
    let nightlyRate = place ? place.price : 0; // Default to 0 if place is not loaded

    // Pricing adjustments based on the number of guests
    const guestPricingPolicy = {
        3: 500,   // Increase for 3 guests
        4: 500,   // Same increase for 4 guests
        5: 1000,  // Increase for 5 guests
        6: 1500,  // Increase for 6 guests
        7: 2000   // Increase for 7 or more guests
    };

    // Loop through the guest pricing policy
    for (let i = 3; i <= guests; i++) {
        if (guestPricingPolicy[i]) {
            nightlyRate += guestPricingPolicy[i];
        }
        else if (i > 7) {
            nightlyRate += 2500;
        }
    }

    // Calculate subtotal
    const subtotal = nightlyRate * numberOfNights;

    // Calculate fees and total
    const serviceFee = subtotal * serviceFeePercentage;
    const totalBeforeDiscount = subtotal + serviceFee;
    const total = totalBeforeDiscount - discount;

    const today = new Date().toISOString().split('T')[0];

    async function bookThisPlace() {
        try {
            const response = await axios.post('/bookings', {
                checkIn, checkOut, guests,
                placeId: place._id, price: total,
            });

            const bookingId = response.data.id;
            alert(`Booking successful! Booking ID: ${bookingId}`);
        } catch (error) {
            console.error('Booking failed:', error);
            alert('Booking failed. Please try again.');
        }
    }

    return (
        <div className='flex flex-col gap-2 md:w-max h-fit p-4 mt-8 shadow-xl rounded-2xl shadow-slate-300'>
            <h3 className='font-semibold text-[22px]'>
                ₹{nightlyRate}
                <span className="text-lg font-medium"> night</span>
            </h3>
            <div className='border rounded-xl text-sm '>
                <div className="flex">
                    <div className='my-2 p-2 rounded-xl mt-2 '>
                        <p>CHECK-IN</p>
                        <input
                            type="date"
                            value={checkIn}
                            min={today}
                            ref={checkInRef}
                            onChange={e => setCheckIn(e.target.value)}
                        />
                    </div>
                    <div className='my-2 p-2 border-l'>
                        <p>CHECKOUT</p>
                        <input
                            type="date"
                            value={checkOut}
                            min={checkIn ? checkIn : today}
                            onChange={e => setCheckOut(e.target.value)}
                        />
                    </div>
                </div>
                <div className='mt-2 p-2 pb-1 border-t'>
                    <p>GUESTS</p>
                    <input
                        type="number"
                        value={guests}
                        onChange={e => setGuests(Math.max(1, Number(e.target.value)))}
                        max={place.maxGuests}
                        className="mt-1 block w-40 rounded-md shadow-sm p-2" />
                </div>
            </div>
            {total > 0 ? (
                // <Link to={'/places/book'}>
                <button onClick={bookThisPlace} className="primary !rounded-xl !bg-[#d81a40] mt-2 ">
                    Reserve
                </button>
                // </Link>
            ) : (
                <button className="primary !rounded-xl !bg-[#d81a40] mt-2" onClick={handleCheckAvailabilityClick} >
                    Check availability
                </button>
            )}
            {total > 0 && (
                <p className="text-center text-sm m-1">You won't be charged yet</p>
            )
            }
            <div className="flex flex-col gap-2">
                {numberOfNights > 0 && (
                    <div className="flex justify-between items-center">
                        <span>{`${nightlyRate} x ${numberOfNights} nights`}</span>
                        <span>₹{subtotal.toFixed(2)}</span>
                    </div>
                )}
                {serviceFee > 0 && (
                    <div className="flex justify-between items-center">
                        <span>Service Fee (15%)</span>
                        <span>₹{serviceFee.toFixed(2)}</span>
                    </div>
                )}
                {discount > 0 && (
                    <div className="flex justify-between items-center">
                        {numberOfNights >= 7 && numberOfNights <= 13 ? (
                            <span>Weekly stay discount</span>
                        ) : (
                            <span>Long stay discount</span>
                        )}
                        <span></span>
                        <span>-₹{discount.toFixed(2)}</span>
                    </div>
                )}
                {total > 0 && (
                    <>
                        <hr className='' />
                        <div className="flex justify-between items-center font-bold">
                            <span>Total</span>
                            <span>₹{total.toFixed(2)}</span>
                        </div>
                    </>
                )}
            </div>
        </div >
    );
}