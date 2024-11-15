const cloudinary = require("../config/cloudinaryConfig");
const Car = require('../models/Car'); // assuming you have a Car model in the models folder

exports.uploadCar = async (req, res) => {
    try {
      // Check if files are uploaded
      const userId = req.userId;
      const { title, description, tags } = req.body;
      console.log(req.files);
      if (!req.files || req.files.length === 0) {
        return res.status(400).json({ error: 'No files were uploaded' });
      }
  
      // Use Promise.all to wait for all files to be uploaded to Cloudinary
      const uploadResults = await Promise.all(req.files.map(file =>
        cloudinary.uploader.upload(file.path, { folder: 'Cars' })
      ));
  
      // Extract image URLs from uploadResults
      const imageUrls = uploadResults.map(result => result.secure_url);
  
      // Create a new car document with image URLs and other details
      const newCar = new Car({
        title,
        userId,
        description,
        tags: tags.split(","),
        images: imageUrls // Store the image URLs in the images array
      });
  
      // Save the new car to MongoDB
      await newCar.save();
  
      res.status(201).json({ message: 'Car Added successfully', car: newCar });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to Add car' });
    }
}

exports.editCar = async (req, res) => {
  try {
    const { id } = req.params; // Get carId from URL params
    const { title, description, tags } = req.body;
    const updatedData = {};

    // Prepare updated data object
    if (title) updatedData.title = title;
    if (description) updatedData.description = description;
    if (tags) updatedData.tags = tags;

    // Check if files are uploaded
    if (req.files && req.files.length > 0) {
      // Upload new images to Cloudinary and get URLs
      const uploadResults = await Promise.all(req.files.map(file =>
        cloudinary.uploader.upload(file.path, { folder: 'Cars' })
      ));
      const imageUrls = uploadResults.map(result => result.secure_url);
      updatedData.images = imageUrls; // Update images array
    }
    console.log(id,updatedData);
    // Find the car and update
    const car = await Car.findByIdAndUpdate(id, updatedData, { new: true });

    if (!car) {
      return res.status(404).json({ error: 'Car not found' });
    }

    res.status(200).json({ message: 'Car updated successfully', car });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update car' });
  }
};

exports.deleteCar = async (req, res) => {
    try {
      const { id } = req.params; // Get carId from URL params
  
      // Find and delete the car
      const car = await Car.findByIdAndDelete(id);
  
      if (!car) {
        return res.status(404).json({ error: 'Car not found' });
      }
  
      res.status(200).json({ message: 'Car deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to delete car' });
    }
  };

exports.getAllCars = async (req, res) => {
    try {
        const userId = req.userId;
        const cars = await Car.find({userId}); // Fetch all cars from the database
        res.status(200).json({ cars });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch cars' });
    }
};

exports.getCarById = async (req, res) => {
    const { id } = req.params; // Get the car ID from the URL parameters
    try {
        // Find the car by its ID
        const car = await Car.findById(id);
        // If the car is not found, return a 404 error
        console.log(car);
        if (!car) {
            return res.status(404).json({ error: 'Car not found' });
        }
        // Return the car data
        res.status(200).json({ car });
    } catch (error) {
        console.error(error);
        // If there's an error (e.g., invalid ID format), return a 500 error
        res.status(500).json({ error: 'Failed to fetch car' });
    }
};
