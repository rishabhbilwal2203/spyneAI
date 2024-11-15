// routes/carRoutes.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const { uploadCar, editCar, deleteCar, getAllCars, getCarById } = require('../controllers/carController');
const storage = multer.diskStorage({});
const upload = multer({ storage });
const authMiddleware = require('../middleware/authMiddleware');

router.post('/add',authMiddleware, upload.array('images', 10), uploadCar);

// Route to update an existing car
router.put('/update/:id',authMiddleware, upload.array('images', 10), editCar);


// Route to delete a car
router.delete('/delete/:id',authMiddleware, deleteCar);

router.get('/',authMiddleware, getAllCars);

router.get('/car/:id',authMiddleware, getCarById);

module.exports = router;
