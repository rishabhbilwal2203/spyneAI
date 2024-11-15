// middleware/upload.js
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinaryConfig');

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'car_images',
    format: async (req, file) => 'jpg', // Supports different formats
    public_id: (req, file) => Date.now(),
  },
});

const upload = multer(storage);

module.exports = upload;
