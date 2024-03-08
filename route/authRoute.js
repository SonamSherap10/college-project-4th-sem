const { createUser, forgotPassword, verifyOtp, resetPassword } = require('../controller/auth/authController');
const { loginUser } = require('../controller/auth/authController');

const router = require('express').Router();

router.post('/register',createUser)
router.post('/login',loginUser)
router.post('/forgotPassword',forgotPassword)
router.post('/otpCheck',verifyOtp)
router.post('/changePassword',resetPassword)


module.exports = router