import { Router } from 'express';
import { authMiddleware } from '../middlewares/auth-middleware.js';
import {
  getAllGalleryImages,
  getGalleryImage,
  uploadGalleryImage,
  updateGalleryImage,
  deleteGalleryImage,
  upload
} from '../controllers/gallery-controller.js';

const router = Router();

// Public routes
router.get('/', getAllGalleryImages);
router.get('/:id', getGalleryImage);

// Protected routes - require authentication
router.use(authMiddleware);
router.post('/upload', upload.single('image'), uploadGalleryImage);
router.patch('/:id', updateGalleryImage);
router.delete('/:id', deleteGalleryImage);

export default router;