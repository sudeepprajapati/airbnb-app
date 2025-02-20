import { Booking } from '../models/booking.model.js';
import { Place } from '../models/place.model.js';
import getUserDataFromReq from '../getUserDataFromReq.js';

export const BookPlace = async (req, res) => {
    const userData = await getUserDataFromReq(req)

    const { placeId, checkIn, checkOut, guests, price } = req.body;

    try {
        const place = await Place.findById(placeId);
        if (!place) return res.status(404).json({ message: 'Place not found' });

        const booking = new Booking({
            place: placeId,
            checkIn,
            checkOut,
            numberOfGuests: guests,
            totalPrice: price,
            user: userData.id
        });

        await booking.save();
        res.json({ message: 'Booking successful', id: booking._id });
    } catch (error) {
        res.status(500).json({ message: 'Booking failed', error });
    }

};

export const getBookings = async (req, res) => {
    try {
        const userData = await getUserDataFromReq(req);
        const bookings = await Booking.find({ user: userData.id }).populate('place');
        res.json(bookings);
    } catch (error) {
        console.error('Failed to fetch bookings:', error);
        res.status(500).json({ message: 'Failed to fetch bookings', error });
    }
};