const express = require('express');
const router = express.Router();
const userController = require('../controllers/user-controller');
const auth = require('../middlewares/auth');

router.post('/send-otp', userController.sendOtp);
router.post('/login', userController.login);
router.post('/logout', auth, userController.logout);

module.exports = router;