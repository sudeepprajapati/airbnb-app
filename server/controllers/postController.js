import { v2 as cloudinary } from 'cloudinary';
import { Place } from '../models/place.model.js';
import getUserDataFromReq from '../getUserDataFromReq.js';

// Configure Cloudinary
cloudinary.config({
cloud_name: process.env.CLOUD_NAME,
api_key: process.env.API_KEY,
api_secret: process.env.API_SECRET

});

const addPhotoByLink = async (req, res) => {
    const { link } = req.body; // Get the image link from the request body

    try {
        // Upload the image link directly to Cloudinary
        const result = await cloudinary.uploader.upload(link, {
            upload_preset: 'your_upload_preset' // Specify your upload preset if needed
        });
        res.json({ url: result.secure_url }); // Return the Cloudinary URL

    } catch (error) {
        console.error('Error uploading to Cloudinary:', error);
        res.status(500).json({ error: 'Failed to upload image' });
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
    const uploadedFiles = []; // Array to hold the URLs of uploaded files from Cloudinary



    try {
        for (let i = 0; i < req.files.length; i++) {
            const { path } = req.files[i]; // Get the file path from the request
            const result = await cloudinary.uploader.upload(path.path, {
                upload_preset: 'your_upload_preset' // Specify your upload preset if needed
            }); // Upload the file to Cloudinary


            uploadedFiles.push(result.secure_url); // Store the Cloudinary URL
        }

        res.json(uploadedFiles); // Respond with the list of uploaded file URLs from Cloudinary

    } catch (error) {
        console.error('Error uploading to Cloudinary:', error);
        res.status(500).json({ error: 'Failed to upload images' });
    }

};
const addPlaces = async (req, res) => {
    try {
        const userData = await getUserDataFromReq(req);
        const {
            title, address, addedPhotos, description,
            perks, extraInfo, checkIn, checkOut, maxGuests, price
        } = req.body;

        const placeDoc = await Place.create({
            owner: userData.id,
            title, address, photos: addedPhotos, description,
            perks, extraInfo, checkIn, checkOut, maxGuests, price
        });
        res.json({ message: 'Place added', placeDoc });
    } catch (err) {
        res.status(401).json({ message: 'Unauthorized' });
    }
};

const getPlaces = async (req, res) => {
    try {
        const userData = await getUserDataFromReq(req);
        const places = await Place.find({ owner: userData.id });
        res.json(places);
    } catch (err) {
        res.status(401).json({ message: 'Unauthorized' });
    }
};

const getPlacesId = async (req, res) => {
    const { id } = req.params;
    const place = await Place.findById(id).populate('owner', 'name');
    res.json(place);
}

const updatePlaces = async (req, res) => {
    try {
        const userData = await getUserDataFromReq(req);
        const { id } = req.params;
        const {
            title, address, addedPhotos, description,
            perks, extraInfo, checkIn, checkOut, maxGuests, price
        } = req.body;

        const placeDoc = await Place.findById(id);
        if (userData.id === placeDoc.owner.toString()) {
            placeDoc.set({
                title, address, photos: addedPhotos, description,
                perks, extraInfo, checkIn, checkOut, maxGuests, price
            });
            await placeDoc.save();
            res.json({ message: 'Place updated', placeDoc });
        } else {
            res.status(403).json({ message: 'Unauthorized' });
        }
    } catch (err) {
        res.status(401).json({ message: 'Unauthorized' });
    }
};

const PlacesForAll = async (req, res) => {
    const PlaceDoc = await Place.find()
    res.json(PlaceDoc)
}

const deletePlaces = async (req, res) => {
    try {
        const userData = await getUserDataFromReq(req);
        const { id } = req.params;

        const placeDoc = await Place.findById(id);
        if (!placeDoc) {
            return res.status(404).json({ message: 'Place not found' });
        }

        if (userData.id === placeDoc.owner.toString()) {
            await Place.findByIdAndDelete(id);
            res.json({ message: 'Place deleted' });
        } else {
            res.status(403).json({ message: 'Unauthorized' });
        }
    } catch (err) {
        res.status(401).json({ message: 'Unauthorized' });
    }
};

export {
    addPhotoByLink, uploadPhoto, addPlaces,
    getPlaces, getPlacesId, updatePlaces,
    PlacesForAll, deletePlaces
};
