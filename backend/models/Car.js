// models/Car.js
const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  tags: [{ type: String }],
  images: [{ type: String }], // Array of URLs for Cloudinary images
});

module.exports = mongoose.model('Car', carSchema);
