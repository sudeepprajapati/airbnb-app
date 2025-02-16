import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
    place: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Place',
        required: true
    },
    checkIn: { type: Date, required: true },
    checkOut: { type: Date, required: true },
    numberOfGuests: Number,
    totalPrice: { type: Number, required: true, },
}, { timestamps: true });

export const Booking = mongoose.model('Booking', bookingSchema);