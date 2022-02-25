// Route to user authentication.
const express = require('express');
const router = express.Router();
const {check} = require('express-validator');
const authController = require('../controllers/authController');
const auth = require('../middleware/auth');

// Authenticate a user and login.
// api/auth

router.post('/',
    authController.userAuthentication
);

// get user logged.
router.get('/',
    auth,
    authController.userAuthenticated
);

module.exports = router;