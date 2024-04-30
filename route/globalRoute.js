const isAuthenticated = require('../middleware/authentication');
const CatchError = require('../services/catchError');
const extractLocationData = require('../middleware/extractLocation');
const { viewProfessionals, viewProfessionalsQualifications, updateProfile, getAll } = require('../controller/global/globalController');
const {multer,storage}= require("./../middleware/multerConfig");
const catchError = require('../services/catchError');
const upload = multer({
   storage: storage 
  })
const router = require('express').Router(); 

router.get('/viewAll',catchError(getAll))
router.get('/viewProfessionals/:job',CatchError(viewProfessionals))
router.get('/viewQualifications/:id',isAuthenticated,CatchError(viewProfessionalsQualifications))
router.post('/updateProfile/:id',isAuthenticated,upload.single("ProfilePicture"),CatchError(updateProfile))
module.exports = router