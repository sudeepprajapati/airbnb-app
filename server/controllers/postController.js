import imageDownloader from 'image-downloader';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';
import { Place } from '../models/place.model.js';
import { jwtSecret } from './userController.js';
import jwt from "jsonwebtoken"

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const addPhotoByLink = async (req, res) => {
    const { link } = req.body;

    const uploadDir = join(__dirname, '../uploads');
    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
    }

    // Get the current date
    const now = new Date();
    const day = String(now.getDate()).padStart(2, '0'); // Get day and pad with zero if needed
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Get month (0-indexed) and pad
    const year = String(now.getFullYear()).slice(-2); // Get last two digits of the year

    // Check existing files to determine the highest index
    const existingFiles = fs.readdirSync(uploadDir);
    const existingIndexes = existingFiles
        .map(file => {
            const match = file.match(/IMG-\d{2}\d{2}\d{2}-(\d+)\.jpg/); // Match the pattern IMG-YYMMDD-index.jpg
            return match ? parseInt(match[1], 10) : 0; // Extract the index or return 0 if not matched
        });

    const maxIndex = existingIndexes.length > 0 ? Math.max(...existingIndexes) : 0; // Get the maximum index

    // Generate a new name with the next index
    const newIndex = maxIndex + 1; // Increment the max index for the new file
    const newName = `IMG-${year}${month}${day}-${newIndex}.jpg`; // Create the new filename

    try {
        await imageDownloader.image({
            url: link,
            dest: join(uploadDir, newName)
        });

        res.json({ filename: newName });
    } catch (error) {
        console.error('Error downloading the image:', error);
        res.status(500).json({ error: 'Failed to download the image' });
    }
};

const uploadPhoto = async (req, res) => {
    const uploadDir = join(__dirname, '../uploads');

    // Ensure the upload directory exists
    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
    }

    const uploadedFiles = [];

    // Get the highest index from existing files
    const existingFiles = fs.readdirSync(uploadDir);
    const existingIndexes = existingFiles
        .map(file => {
            const match = file.match(/IMG-\d{6}-(\d+)\.jpg/); // Match the pattern IMG-DDMMYY-index.jpg
            return match ? parseInt(match[1], 10) : 0; // Extract the index or return 0 if not matched
        });

    const maxIndex = existingIndexes.length > 0 ? Math.max(...existingIndexes) : 0; // Get the maximum index

    for (let i = 0; i < req.files.length; i++) {
        const { path, originalname } = req.files[i];
        const parts = originalname.split('.');
        const ext = parts[parts.length - 1]; // Get the file extension

        // Generate a new name with the next index
        const newIndex = maxIndex + i + 1; // Increment the max index for each new file
        const newName = `IMG-${new Date().getFullYear().toString().slice(-2)}${String(new Date().getMonth() + 1).padStart(2, '0')}${String(new Date().getDate()).padStart(2, '0')}-${newIndex}.${ext}`;
        const newPath = join(uploadDir, newName); // Create the new file path

        // Rename the file to the new path
        fs.renameSync(path, newPath);
        uploadedFiles.push(newName); // Store the new filename
    }

    res.json(uploadedFiles); // Respond with the list of uploaded files
};

const addPlaces = async (req, res) => {
    const { token } = req.cookies;
    const {
        title, address, addedPhotos, description,
        perks, extraInfo, checkIn, checkOut, maxGuests } = req.body;

    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        if (err) throw err;
        const placeDoc = await Place.create({
            owner: userData.id,
            title, address, photos: addedPhotos, description,
            perks, extraInfo, checkIn, checkOut, maxGuests
        })
        res.json({ message: 'Place added', placeDoc });
    })
}

const getPlaces = async (req, res) => {
    const { token } = req.cookies;

    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        if (err) throw err;
        const places = await Place.find({ owner: userData.id });
        res.json(places);
    })
}

const getPlacesId = async (req, res) => {
    const { id } = req.params;
    const place = await Place.findById(id);
    res.json(place);
}

const updatePlaces = async (req, res) => {
    const { id } = req.params;
    const { token } = req.cookies;
    const { title, address, addedPhotos, description,
        perks, extraInfo, checkIn, checkOut, maxGuests } = req.body;

    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        if (err) throw err;
        const placeDoc = await Place.findById(id)
        if (userData.id === placeDoc.owner.toString()) {
            placeDoc.set({
                title, address, photos: addedPhotos, description,
                perks, extraInfo, checkIn, checkOut, maxGuests
            })
            await placeDoc.save()
            res.json({ message: 'Place updated', placeDoc });
        }
    })
}



export { addPhotoByLink, uploadPhoto, addPlaces, getPlaces, getPlacesId, updatePlaces };