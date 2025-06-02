import mongoose, { Document, Schema } from 'mongoose';

export interface IGallery extends Document {
  title: string;
  description?: string;
  imageUrl: string;
  cloudinaryId: string;
  publicId: string;
  uploadedBy: mongoose.Types.ObjectId;
  tags?: string[];
  createdAt: Date;
  updatedAt: Date;
}

const gallerySchema = new Schema<IGallery>(
  {
    title: {
      type: String,
      required: [true, 'Image title is required'],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    imageUrl: {
      type: String,
      required: [true, 'Image URL is required'],
    },
    cloudinaryId: {
      type: String,
      required: [true, 'Cloudinary ID is required'],
    },
    publicId: {
      type: String,
      required: [true, 'Public ID is required'],
    },
    uploadedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User ID is required'],
    },
    tags: [{
      type: String,
      trim: true,
    }],
  },
  { timestamps: true }
);

const Gallery = mongoose.model<IGallery>('Gallery', gallerySchema);

export default Gallery;