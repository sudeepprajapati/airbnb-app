import { Router } from "express";
import {
    addPhotoByLink, addPlaces, uploadPhoto,
    getPlaces, getPlacesId, updatePlaces,
    PlacesForAll,
    deletePlaces
} from '../controllers/postController.js';
import multer from 'multer';

const router = Router();
const photosMiddleware = multer({ dest: 'uploads' })


// Route to add a photo by link as part of a post
router.post('/add-by-link', addPhotoByLink);
router.post('/upload', photosMiddleware.array('photos', 100), uploadPhoto);
router.post('/places', addPlaces);
router.get('/user-places', getPlaces);
router.get('/places/:id', getPlacesId);
router.put('/places/:id', updatePlaces);
router.get('/places', PlacesForAll)
router.delete('/places/:id', deletePlaces);

export default router;