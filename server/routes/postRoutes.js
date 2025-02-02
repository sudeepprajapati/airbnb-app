import { Router } from "express";

import { addPhotoByLink, uploadPhoto } from '../controllers/postController.js';
// import { authenticate } from '../middleware/auth.js'; 
import multer from 'multer';

const router = Router();
const photosMiddleware = multer({ dest: 'uploads' })


// Route to add a photo by link as part of a post
router.post('/add-by-link', addPhotoByLink);
router.post('/upload', photosMiddleware.array('photos', 100), uploadPhoto);

// You can add more routes related to posts here
// e.g., router.post('/create', authenticate, createPost);
// e.g., router.get('/:id', getPostById);

export default router;