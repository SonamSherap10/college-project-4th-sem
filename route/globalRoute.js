const isAuthenticated = require('../middleware/authentication');
const CatchError = require('../services/catchError');
const extractLocationData = require('../middleware/extractLocation');
const { viewProfessionals, viewProfessionalsQualifications, updateProfile } = require('../controller/global/globalController');
const {multer,storage}= require("./../middleware/multerConfig");
const upload = multer({
   storage: storage 
  })
const router = require('express').Router();


router.get('/viewProfessionals',isAuthenticated,extractLocationData,CatchError(viewProfessionals))
router.get('/viewQualifications/:id',isAuthenticated,CatchError(viewProfessionalsQualifications))
router.post('/updateProfile/:id',isAuthenticated,upload.single("ProfilePicture"),CatchError(updateProfile))
module.exports = router