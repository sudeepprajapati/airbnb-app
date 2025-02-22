import React from 'react';

export const BookingConfirmation = () => {
    // Sample data, in a real application this would come from props or state
    const tripDetails = {
        location: "Mirror House North",
        type: "Tiny home",
        rating: 4.89,
        reviews: 107,
        checkIn: "2023-03-07",
        checkOut: "2023-03-20",
        guests: 1,
        pricePerNight: 20914.56,
        totalNights: 13,
        weeklyDiscount: 27188.98,
        serviceFee: 40131.41,
    };

    // Calculate total price
    const subtotal = tripDetails.pricePerNight * tripDetails.totalNights;
    const total = subtotal - tripDetails.weeklyDiscount + tripDetails.serviceFee;

    return (
        <div className='flex gap-20'>
            <div className="mt-10 max-w-screen-sm">
                <h1 className='text-3xl'>Request to Book</h1>
                <h2 className='mt-7 text-xl font-bold'>Your Trip</h2>
                <div className="flex flex-col gap-2">
                    <div>
                        <h3>Dates</h3>
                        <p>{`${tripDetails.checkIn} – ${tripDetails.checkOut}`}</p>
                    </div>
                    <div>
                        <h3>Guests</h3>
                        <p>{`${tripDetails.guests} guest`}</p>
                    </div>
                </div>
                <hr className="my-7" />

                <h2 className='text-xl font-bold'>Required for Your Trip</h2>
                <div className="message-host">
                    <p>Message the host</p>
                    <textarea placeholder="Tell the host a little about your trip..."></textarea>
                </div>
                <div className="phone-number">
                    <p>Phone number</p>
                    <input type="text" placeholder="Add and confirm your phone number" />
                </div>
                <hr className="my-7" />
                <div className='flex flex-col gap-3'>
                    <h2 className='text-xl font-bold'>Cancellation Policy</h2>
                    <p>Cancel before 12:00 PM on {tripDetails.checkIn} for a partial refund. After that, your refund depends on when you cancel. Learn more.</p>
                </div>
                <hr className="my-7" />
                <div className='flex flex-col gap-3'>
                    <h2 className='text-xl font-bold'>Ground Rules</h2>
                    <p>We ask every guest to remember a few simple things about what makes a great guest.
                    </p>
                    <ul >
                        <li>-Follow the house rules</li>
                        <li>-Treat your Host’s home like your own</li>
                    </ul>

                </div>

                <hr className="my-7" />

                <p className=''><span className='font-bold'>The Host will need to accept this request. </span> You’ll pay now, but will get a full refund if your reservation isn’t confirmed within 24 hours.</p>

                <hr className="my-7" />

                <div className='flex flex-col gap-4'>
                    <p className='text-xs'>By selecting the button above, I agree to the Host's House Rules, Ground rules for guests, Airbnb's Rebooking and Refund Policy and that Airbnb can charge my payment method if I’m responsible for damage.</p>
                    <button className="primary max-w-32 h-12 !rounded-xl">
                        Continue
                    </button>
                </div>
            </div>

            <div className='flex flex-col gap-2 md:w-max h-fit p-4 mt-8 border'>
                <h1 className='text-2xl'>Price Details</h1>
                {/* {serviceFee > 0 && ( */}
                    <div className="flex justify-between items-center">
                        <span>Service Fee (15%)</span>
                        {/* <span>₹{serviceFee.toFixed(2)}</span> */}
                    </div>
                {/* )} */}
                {/* {discount > 0 && ( */}
                    <div className="flex justify-between items-center">
                        {/* {numberOfNights >= 7 && numberOfNights <= 13 ? ( */}
                            <span>Weekly stay discount</span>
                        {/* ) : ( */}
                            <span>Long stay discount</span>
                        {/* )} */}
                        <span></span>
                        {/* <span>-₹{discount.toFixed(2)}</span> */}
                    </div>
                {/* )} */}
                {/* {total > 0 && ( */}
                    <>
                        <hr className='' />
                        <div className="flex justify-between items-center font-bold">
                            <span>Total</span>
                            {/* <span>₹{total.toFixed(2)}</span> */}
                        </div>
                    </>
                {/* )} */}
            </div>
        </div>
    );
};
