// models/Car.js
const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  tags: [{ type: String }], // Array of tags
  images: [{ type: String }], // Array of URLs for Cloudinary images
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the user
}, {
  timestamps: true, // Automatically add `createdAt` and `updatedAt` fields
});

module.exports = mongoose.model('Car', carSchema);

