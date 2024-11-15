// routes/carRoutes.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const { uploadCar, editCar, deleteCar, getAllCars } = require('../controllers/carController');
const storage = multer.diskStorage({});
const upload = multer({ storage });


router.post('/add', upload.array('images', 10), uploadCar);

// Route to update an existing car
router.put('/update/:id', upload.array('images', 10), editCar);

// Route to delete a car
router.delete('/delete/:id', deleteCar);

router.get('/',getAllCars);

module.exports = router;
