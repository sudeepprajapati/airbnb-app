import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
    place: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Place',
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    checkIn: { type: Date, required: true },
    checkOut: { type: Date, required: true },
    numberOfGuests: Number,
    totalPrice: { type: Number, required: true, },
}, { timestamps: true });

export const Booking = mongoose.model('Booking', bookingSchema);