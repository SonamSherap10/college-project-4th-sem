const { createUser, loginUser, forgotPassword, verifyOtp, resetPassword } = require('../controller/auth/authController');

const {multer,storage}= require("./../middleware/multerConfig");
const router = require('express').Router();
const upload = multer({
   storage: storage 
  })
  
const CatchError = require('../services/catchError')

router.post('/register',upload.single("ProfilePicture"),CatchError(createUser))
router.post('/login',CatchError(loginUser))
router.post('/forgotPassword',CatchError(forgotPassword))
router.post('/otpCheck',CatchError(verifyOtp))
router.post('/changePassword',CatchError(resetPassword))
 

module.exports = router