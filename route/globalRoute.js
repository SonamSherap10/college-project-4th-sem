const isAuthenticated = require('../middleware/authentication');
const CatchError = require('../services/catchError');
const extractLocationData = require('../middleware/extractLocation');
const { viewProfessionals, viewProfessionalsQualifications, getAll, viewRating } = require('../controller/global/globalController');
const {multer,storage}= require("./../middleware/multerConfig");
const catchError = require('../services/catchError');
const upload = multer({
   storage: storage 
  })
const router = require('express').Router(); 

router.get('/viewAll',catchError(getAll))
router.get('/viewProfessionals/:job',CatchError(viewProfessionals))
router.get('/viewQualifications/:id',CatchError(viewProfessionalsQualifications))
router.get('/viewRating/:id',CatchError(viewRating))
module.exports = router