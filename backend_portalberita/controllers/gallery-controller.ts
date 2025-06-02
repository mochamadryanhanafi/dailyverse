import { Request, Response } from 'express';
import Gallery from '../models/gallery.js';
import { asyncHandler } from '../utils/async-handler.js';
import { ApiResponse } from '../utils/api-response.js';
import { ApiError } from '../utils/api-error.js';
import { HTTP_STATUS, RESPONSE_MESSAGES } from '../utils/constants.js';
import multer from 'multer';
import cloudinary from '../config/cloudinary.js';
import path from 'path';

// Configure multer for temporary storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '/tmp');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, 'gallery-' + uniqueSuffix + ext);
  },
});

// File filter to only allow image files
const fileFilter = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  const allowedFileTypes = /jpeg|jpg|png|webp/;
  const extname = allowedFileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedFileTypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'));
  }
};

export const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
});

// Get all gallery images
export const getAllGalleryImages = asyncHandler(async (req: Request, res: Response) => {
  const images = await Gallery.find({}).sort({ createdAt: -1 });
  
  return res.status(HTTP_STATUS.OK).json(
    new ApiResponse(
      HTTP_STATUS.OK,
      images,
      'Gallery images fetched successfully'
    )
  );
});

// Get a single gallery image
export const getGalleryImage = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  
  const image = await Gallery.findById(id);
  
  if (!image) {
    throw new ApiError({
      status: HTTP_STATUS.NOT_FOUND,
      message: 'Gallery image not found',
    });
  }
  
  return res.status(HTTP_STATUS.OK).json(
    new ApiResponse(
      HTTP_STATUS.OK,
      image,
      'Gallery image fetched successfully'
    )
  );
});

// Upload a new gallery image
export const uploadGalleryImage = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user?._id;
  const { title, description, tags } = req.body;
  
  if (!userId) {
    throw new ApiError({
      status: HTTP_STATUS.UNAUTHORIZED,
      message: RESPONSE_MESSAGES.USERS.RE_LOGIN,
    });
  }
  
  if (!req.file) {
    throw new ApiError({
      status: HTTP_STATUS.BAD_REQUEST,
      message: 'No file uploaded',
    });
  }
  
  if (!title) {
    throw new ApiError({
      status: HTTP_STATUS.BAD_REQUEST,
      message: 'Title is required',
    });
  }
  
  // Upload image to Cloudinary
  const result = await cloudinary.uploader.upload(req.file.path, {
    folder: 'wanderlust/gallery',
    resource_type: 'image',
  });
  
  // Create new gallery entry
  const galleryImage = await Gallery.create({
    title,
    description,
    imageUrl: result.secure_url,
    cloudinaryId: result.asset_id,
    publicId: result.public_id,
    uploadedBy: userId,
    tags: tags ? JSON.parse(tags) : [],
  });
  
  return res.status(HTTP_STATUS.CREATED).json(
    new ApiResponse(
      HTTP_STATUS.CREATED,
      galleryImage,
      'Gallery image uploaded successfully'
    )
  );
});

// Update gallery image details
export const updateGalleryImage = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user?._id;
  const { id } = req.params;
  const { title, description, tags } = req.body;
  
  if (!userId) {
    throw new ApiError({
      status: HTTP_STATUS.UNAUTHORIZED,
      message: RESPONSE_MESSAGES.USERS.RE_LOGIN,
    });
  }
  
  const image = await Gallery.findById(id);
  
  if (!image) {
    throw new ApiError({
      status: HTTP_STATUS.NOT_FOUND,
      message: 'Gallery image not found',
    });
  }
  
  // Check if user is the uploader
  if (image.uploadedBy.toString() !== userId.toString()) {
    throw new ApiError({
      status: HTTP_STATUS.FORBIDDEN,
      message: 'You are not authorized to update this image',
    });
  }
  
  // Update fields
  if (title) image.title = title;
  if (description !== undefined) image.description = description;
  if (tags) image.tags = JSON.parse(tags);
  
  await image.save();
  
  return res.status(HTTP_STATUS.OK).json(
    new ApiResponse(
      HTTP_STATUS.OK,
      image,
      'Gallery image updated successfully'
    )
  );
});

// Delete gallery image
export const deleteGalleryImage = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user?._id;
  const { id } = req.params;
  
  if (!userId) {
    throw new ApiError({
      status: HTTP_STATUS.UNAUTHORIZED,
      message: RESPONSE_MESSAGES.USERS.RE_LOGIN,
    });
  }
  
  const image = await Gallery.findById(id);
  
  if (!image) {
    throw new ApiError({
      status: HTTP_STATUS.NOT_FOUND,
      message: 'Gallery image not found',
    });
  }
  
  // Check if user is the uploader or admin
  if (image.uploadedBy.toString() !== userId.toString() && req.user?.role !== 'admin') {
    throw new ApiError({
      status: HTTP_STATUS.FORBIDDEN,
      message: 'You are not authorized to delete this image',
    });
  }
  
  // Delete image from Cloudinary
  await cloudinary.uploader.destroy(image.publicId);
  
  // Delete image from database
  await Gallery.findByIdAndDelete(id);
  
  return res.status(HTTP_STATUS.OK).json(
    new ApiResponse(
      HTTP_STATUS.OK,
      {},
      'Gallery image deleted successfully'
    )
  );
});