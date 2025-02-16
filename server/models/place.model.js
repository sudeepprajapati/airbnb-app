import mongoose from 'mongoose';

const placeSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User ',
        required: true
    },
    title: { type: String, required: true },
    address: { type: String, required: true },
    photos: [String],
    description: { type: String, required: true },
    perks: [String],
    extraInfo: String,
    checkIn: { type: Date, required: true },
    checkOut: { type: Date, required: true },
    maxGuests: { type: Number, required: true, min: 1 },
    price: { type: Number, required: true, min: 0 },
}, { timestamps: true });

export const Place = mongoose.model('Place', placeSchema);