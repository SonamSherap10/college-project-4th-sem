const { createUser, loginUser, forgotPassword, verifyOtp, resetPassword } = require('../controller/auth/authController');

const {multer,storage}= require("./../middleware/multerConfig");
const router = require('express').Router();
const uploads = multer({storage: storage})


router.post('/register',uploads.array('qualifications',10),createUser)
router.post('/login',loginUser)
router.post('/forgotPassword',forgotPassword)
router.post('/otpCheck',verifyOtp)
router.post('/changePassword',resetPassword)


module.exports = router