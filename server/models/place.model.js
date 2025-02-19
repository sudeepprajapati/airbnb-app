import mongoose from 'mongoose';

const placeSchema = new mongoose.Schema({
    title: { type: String, required: true },
    address: { type: String, required: true },
    photos: [String],
    description: { type: String, required: true },
    perks: [String],
    checkIn: { type: Date, required: true },
    checkOut: { type: Date, required: true },
    maxGuests: { type: Number, required: true },
    price: { type: Number, required: true },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true });

export const Place = mongoose.model('Place', placeSchema);