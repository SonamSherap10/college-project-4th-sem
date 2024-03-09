const { viewProfessionals } = require('../controller/user/userController');
const isAuthenticated = require('../middleware/Authentication');

const router = require('express').Router();

router.get('/viewProfessionals',isAuthenticated,viewProfessionals)

module.exports = router