const isAuthenticated = require('../middleware/authentication');
const CatchError = require('../services/catchError');
const extractLocationData = require('../middleware/extractLocation');
const { viewProfessionals } = require('../controller/global/globalController');
const router = require('express').Router();


router.get('/viewProfessionals',isAuthenticated,extractLocationData,CatchError(viewProfessionals))

module.exports = router