
const express = require('express');
const { Login, Signup } = require('../controllers/authController');
const router = express.Router();

// Signup route
router.post('/signup', Login);

// Login route
router.post('/login', Signup);

module.exports = router;
