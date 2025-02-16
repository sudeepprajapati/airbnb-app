import { Booking } from '../models/booking.model.js';
import { Place } from '../models/place.model.js';
import jwt from "jsonwebtoken"
import { jwtSecret } from "../config.js"


export const BookPlace = async (req, res) => {
    const { token } = req.cookies;
    const { placeId, checkIn, checkOut, guests, price } = req.body;

    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        if (err) return res.status(401).json({ message: 'Unauthorized' });

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
    });
};